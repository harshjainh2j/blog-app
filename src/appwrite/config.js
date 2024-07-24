import conf from "../conf/conf";
import { Databases, Storage, Client, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  bucket;
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_id)
      .setProject(conf.appwrite_project_id);

    this.bucket = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  async createPost({title, slug, content, featuredImage, status, userId}){
    try {
        return await this.databases.createDocument(
            conf.appwrite_database_id,
            conf.appwrite_collection_id,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        )
    } catch (error) {
        console.log("Appwrite serive :: createPost :: error", error);
    }
} 

async updatePost(slug, {title, content, featuredImage, status}){
  try {
      return await this.databases.updateDocument(
          conf.appwrite_database_id,
          conf.appwrite_collection_id,
          slug,
          {
              title,
              content,
              featuredImage,
              status,

          }
      )
  } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
  }
}
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwrite_database_id, conf.appwrite_collection_id, slug);
      return true;
    } catch (error) {
      console.log("Error deleting the document :: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(conf.appwrite_database_id, conf.appwrite_collection_id, slug);
    } catch (error) {
      console.log("Error fetching the document :: ", error);
      return false
    }
  }

  async getPosts(query = [Query.equal("status", "active")]) { 
    try {
      return await this.databases.listDocuments(conf.appwrite_database_id, conf.appwrite_collection_id, query);
    } catch (error) {
      console.log("Error fetching documents :: ", error);
      return false;
    }
  }

  // files

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwrite_bucket_id, ID.unique(), file);
    } catch (error) {
      console.log("Error creating the file :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwrite_bucket_id, fileId);
      return true;
    } catch (error) {
      console.log("Error deleting the file :: ", error);
      return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwrite_bucket_id,
        fileId
    )
}
}
const service = new Service();
export default service;
