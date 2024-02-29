import { Component } from '@angular/core';
import { CodeService, ICodeFolder, defaultCodeFolder } from '../../../services/code.service';
import { CommonModule } from '@angular/common';
import { Id } from '../../../app.config';

@Component({
  selector: 'app-documentation-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentation-overview.component.html',
  styleUrl: './documentation-overview.component.scss'
})
export class DocumentationOverviewComponent {
  root: ICodeFolder = defaultCodeFolder;
  currentFolder: ICodeFolder = defaultCodeFolder;
  allFoldersFlatMap: ICodeFolder[] = [];

  public constructor(private readonly codeService: CodeService) {
    
  }

  async ngOnInit() {
    this.root = await this.codeService.getRoot();
    this.currentFolder = this.root;
    this.flattenFolders(this.root);
  }

  openFolder(folderName: string) {
    const folder: ICodeFolder | null = this.currentFolder.folders.find(f => f.title === folderName) ?? null;
    
    if(folder !== null) {
      this.currentFolder = folder;
    }
  }

  openPreviousFolder(parentFolderId: Id | null) {
    if(parentFolderId === null) this.currentFolder = this.root;

    const folder: ICodeFolder | null = this.allFoldersFlatMap.find(f => f.folderId === parentFolderId) ?? null;
    
    if(folder !== null) {
      this.currentFolder = folder;
    }
  }

  flattenFolders(folder: ICodeFolder) {
    this.allFoldersFlatMap.push(folder);
    folder.folders.forEach(f => {
      this.flattenFolders(f);
    });
  }
}
