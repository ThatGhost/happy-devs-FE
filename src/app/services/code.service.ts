import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Id } from '../app.config';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private readonly api: ApiService,
    private readonly userService: UserService,
    ) { 

  }

  public async getRoot(): Promise<ICodeFolder> {
    if (!this.userService.isUserLoggedIn()) return defaultCodeFolder;

    const raw: ICodeFolderData =  await this.api.get<ICodeFolderData>(`Code/root`);
    return this.toCodeFolder(raw, null);
  }

  private toCodeFolder(data: ICodeFolderData, parentId: Id | null): ICodeFolder {
    const atDate: Date = new Date(data.at);
    return {
      folderId: data.folderId,
      parentFolder: parentId,
      title: data.title,
      at: atDate,
      files: data.files.map(f => {
        const date: Date = new Date(f.at);
        return {
          fileId: f.fileId,
          title: f.title,
          content: f.content,
          folderId: f.folderId,
          at: date,
        }
      }),
      folders: data.folders.map(f => this.toCodeFolder(f, data.folderId)),
    }
  }
}

interface ICodeFolderData {
  folderId: Id,
  title: string,
  at: string,
  files: ICodeFileData[],
  folders: ICodeFolderData[],
}

interface ICodeFileData {
  folderId: Id,
  title: string,
  content: string,
  fileId: Id,
  at: string
}

export interface ICodeFolder {
  folderId: Id,
  title: string,
  at: Date,
  folders: ICodeFolder[],
  files: ICodeFile[],
  parentFolder: Id | null,
}

export interface ICodeFile {
  folderId: Id,
  title: string,
  content: string,
  fileId: Id,
  at: Date,
}

export const defaultCodeFolder: ICodeFolder = {
  folderId: 0,
  title: "",
  at: new Date(),
  folders: [],
  files: [],
  parentFolder: 0,
}