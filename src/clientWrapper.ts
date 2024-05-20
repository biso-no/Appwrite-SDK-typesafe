import { Client, Databases, Models } from 'node-appwrite';
import { DatabaseMap } from './types'; 
import { QueryBuilder } from './lib/query-builder';
import { PermissionBuilder } from './lib/permission-builder';

class TypedAppwriteClient {
  private client: Client;
  private databases: Databases;

  constructor(client: Client) {
    this.client = client;
    this.databases = new Databases(client);
  }

  async createDocument<
    DatabaseId extends keyof DatabaseMap,
    CollectionId extends keyof DatabaseMap[DatabaseId],
    T extends DatabaseMap[DatabaseId][CollectionId] & Models.Document
  >(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId?: string,
      data: Omit<T, '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'>,
      permissions?: PermissionBuilder
    }
  ) {
    const { databaseId, collectionId, documentId = 'unique()', data, permissions } = options;
    const permissionList = permissions ? permissions.build() : [];
    return await this.databases.createDocument<T>(
      databaseId as string,
      collectionId as string,
      documentId,
      data,
      permissionList
    );
  }

  async listDocuments<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      queryBuilder?: QueryBuilder
    }
  ) {
    const { databaseId, collectionId, queryBuilder } = options;

    const queries = queryBuilder ? queryBuilder.build() : [];

    return await this.databases.listDocuments(databaseId as string, collectionId as string, queries);
  }

  async getDocument<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId], DocumentId extends keyof DatabaseMap[DatabaseId][CollectionId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId: DocumentId,
      queryBuilder?: QueryBuilder
    }
  ) {
    const { databaseId, collectionId, documentId, queryBuilder } = options;
    const queries = queryBuilder ? queryBuilder.build() : [];
    return await this.databases.getDocument(databaseId as string, collectionId as string, documentId as string, queries as string[]);
  }

  async updateDocument<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId], DocumentId extends keyof DatabaseMap[DatabaseId][CollectionId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId: DocumentId,
      data: Partial<Omit<DatabaseMap[DatabaseId][CollectionId][DocumentId], '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'>>,
      permissions?: PermissionBuilder
    }
  ) {
    const { databaseId, collectionId, documentId, data, permissions } = options;
    const permissionList = permissions ? permissions.build() : [];
    return await this.databases.updateDocument(
      databaseId as string,
      collectionId as string,
      documentId as string,
      data,
      permissionList
    );
  }

  async deleteDocument<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId], DocumentId extends keyof DatabaseMap[DatabaseId][CollectionId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId: DocumentId
    }
  ) {
    const { databaseId, collectionId, documentId } = options;
    return await this.databases.deleteDocument(
      databaseId as string,
      collectionId as string,
      documentId as string
    );
  }

  async listCollections<DatabaseId extends keyof DatabaseMap>(
    options: {
      databaseId: DatabaseId,
      queries?: QueryBuilder,
      search?: string
    }
  ) {
    const { databaseId, queries, search } = options;
    const queryBuilder = queries ? queries.build() : [];
    return await this.databases.listCollections(databaseId as string, queryBuilder, search);
  }

  async getCollection<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId
    }
  ) {
    const { databaseId, collectionId } = options;
    return await this.databases.getCollection(databaseId as string, collectionId as string);
  }

  async updateCollection<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      name: string,
      permissions?: PermissionBuilder,
      security?: boolean,
      enabled?: boolean
    }
  ) {
    const { databaseId, collectionId, name, permissions, security, enabled } = options;
    const permissionList = permissions ? permissions.build() : [];
    return await this.databases.updateCollection(
      databaseId as string,
      collectionId as string,
      name,
      permissionList,
      security,
      enabled
    );
  }

  async deleteCollection<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId
    }
  ) {
    const { databaseId, collectionId } = options;
    return await this.databases.deleteCollection(
      databaseId as string,
      collectionId as string
    );
  }

  async listDatabases(options?: { queries?: QueryBuilder, search?: string }) {
    const { queries, search } = options || {};
    const queryBuilder = queries ? queries.build() : [];
    return await this.databases.list(queryBuilder, search);
  }

  async getDatabase<DatabaseId extends keyof DatabaseMap>(options: { databaseId: DatabaseId }) {
    const { databaseId } = options;
    return await this.databases.get(databaseId as string);
  }

  async updateDatabase<DatabaseId extends keyof DatabaseMap>(
    options: {
      databaseId: DatabaseId,
      name: string,
      enabled: boolean
    }
  ) {
    const { databaseId, name, enabled } = options;
    return await this.databases.update(
      databaseId as string,
      name,
      enabled
    );
  }

  async deleteDatabase<DatabaseId extends keyof DatabaseMap>(options: { databaseId: DatabaseId }) {
    const { databaseId } = options;
    return await this.databases.delete(
      databaseId as string
    );
  }

  async createDatabase<DatabaseId extends keyof DatabaseMap>(
    options: {
      id: DatabaseId,
      name: string,
      enabled: boolean
    }
  ) {
    const { id, name, enabled } = options;
    return await this.databases.create(
      id as string,
      name,
      enabled
    );
  }

  async listAttributes<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      queries: QueryBuilder
    }
  ) {
    const { databaseId, collectionId, queries } = options;
    const queryBuilder = queries ? queries.build() : [];
    return await this.databases.listAttributes(
      databaseId as string,
      collectionId as string,
      queryBuilder
    );
  }
}

export default TypedAppwriteClient;
