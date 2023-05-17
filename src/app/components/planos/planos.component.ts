import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoInterface } from 'src/app/models/alunos';
import { PlanoInterface } from 'src/app/models/planos';
import { PlanosService } from 'src/app/services/planos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'unidade', 'desdricao', 'valor', 'actions'];
  dataSource!: MatTableDataSource<PlanoInterface>;

  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  length!: number;
  pageSize = 10;
  pageIndex: any;
  pageSizeOptions = [10, 20, 30];
  showFirstLastButtons = true;  

  public planos: any = [];
  public plano = ''; 

  constructor(private planoService: PlanosService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.getAllPlanos();
  }

  getAllPlanos() {
    this.planoService.getAllPlanos()
    .subscribe(planos => {        
      this.planos = planos;
      this.dataSource = new MatTableDataSource<PlanoInterface>(this.planos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }

  deletePlano(id: string) {
    this.planoService.deletePlano(id).then(() => {
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
    let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.planos, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
     
    /* generate workbook and add the worksheet */
    let wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName); 
  }

}
