import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfessorInterface } from 'src/app/models/professores';
import { ProfessoresService } from 'src/app/services/professores.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'celular', 'email', 'unidade', 'status', 'obs', 'actions'];
  dataSource!: MatTableDataSource<ProfessorInterface>;

  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  length!: number;
  pageSize = 10;
  pageIndex: any;
  pageSizeOptions = [10, 20, 30];
  showFirstLastButtons = true;  

  public professores: any = [];
  public professor = ''; 

  constructor(private pfs: ProfessoresService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.getAllProfessores();
  }

  getAllProfessores() {
    this.pfs.getAllProfessores()
    .subscribe(professores => {        
      this.professores = professores;
      this.dataSource = new MatTableDataSource<ProfessorInterface>(this.professores);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }

  deleteProfessor(id: string) {
    this.pfs.deleteProfessor(id).then(() => {
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportToExcel(): void {
    /* pass here the dataSource */
    let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.professores, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
     
    /* generate workbook and add the worksheet */
    let wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName); 
  }

}
