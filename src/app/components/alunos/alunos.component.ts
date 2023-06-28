import { Component, OnInit, ViewChild } from '@angular/core';
import { AlunosService } from 'src/app/services/alunos.service';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoInterface } from 'src/app/models/alunos';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  displayedColumns: string[] = ['status', 'nome', 'unidade', 'email', 'celular', 'telefone', 'actions'];
  dataSource!: MatTableDataSource<AlunoInterface>;

  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private alunoService: AlunosService, private afs: AngularFirestore) { }

  length!: number;
  pageSize = 10;
  pageIndex: any;
  pageSizeOptions = [10, 20, 30];
  showFirstLastButtons = true;  

  public alunos: any = [];
  public aluno = ''; 

  ngOnInit(): void {
    this.getAllAlunos();
  }

  getAllAlunos() {
    this.alunoService.getAllAlunos()
    .subscribe(alunos => {        
      this.alunos = alunos;
      this.dataSource = new MatTableDataSource<AlunoInterface>(this.alunos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteAluno(id: string) {
    this.alunoService.deleteAluno(id).then(() => {
    });
  }

  exportToExcel(): void {
    /* pass here the dataSource */
    let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.alunos, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
     
    /* generate workbook and add the worksheet */
    let wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName); 
  }

}