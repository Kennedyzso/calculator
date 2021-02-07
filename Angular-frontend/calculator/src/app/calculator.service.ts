import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Memory } from './memory';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor(private http: HttpClient) { }

  readMem() {
    return this.http.get<Memory>("http://localhost:3000/readmem");
  }

  updateMem(memory: Memory) {
    return this.http.post<Memory>("http://localhost:3000/updatemem", memory);      
  }

}
