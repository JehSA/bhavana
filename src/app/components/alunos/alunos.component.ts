import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlunosService } from 'src/app/services/alunos.service';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoInterface } from 'src/app/models/alunos';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'email'];
  dataSource!: MatTableDataSource<AlunoInterface>;

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

  ngAfterViewInit(): void { 
    
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

}
