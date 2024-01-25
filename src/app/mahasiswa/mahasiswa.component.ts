import { AfterViewInit,Component,OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const $ : any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})

export class MahasiswaComponent implements OnInit,AfterViewInit {

  data:any;
  table1:any;
  
  constructor (private http: HttpClient, private renderer : Renderer2){

  }
  ngAfterViewInit(): void {

    this.table1 = $("#table1").DataTable();
    this.bind_mahasiswa();
  }
  ngOnInit(): void {
    
  }
  // 
  bind_mahasiswa(): void {
    this.http.get("https://stmikpontianak.net/011100862/tampilMahasiswa.php")
      .subscribe((data: any) => {
        console.log(data);

        this.table1.clear();
        
        data.forEach((e: any) => {
          let ttl = e.TempatLahir + ", " + e.TanggalLahir;

          let rows = [
            e.NIM,
            e.Nama,
            e.JenisKelamin,
            ttl,
            e.JP,
            e.Alamat,
            e.StatusNikah,
            e.TahunMasuk
          ];

          this.table1.row.add(rows);  // Menambahkan baris ke DataTable
        });

        this.table1.draw(false);  // Menggambar tabel setelah menambahkan semua baris
      });
  }
}
