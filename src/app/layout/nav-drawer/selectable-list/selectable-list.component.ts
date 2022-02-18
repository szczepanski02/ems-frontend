import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { navItemList } from './item-list';

@Component({
  selector: 'app-selectable-list',
  templateUrl: './selectable-list.component.html',
  styleUrls: ['./selectable-list.component.scss']
})
export class SelectableListComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  navItems: IItemOfList[] = navItemList;
  employeeAuthority?: string;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeAuthority = this.employeeService.getRole();
  }

  navCategoryFilter(categoryName: string): any {
    return this.navItems.filter(item => item.category === categoryName);
  }

  authorityFilter(authorities: string[]): boolean {
    if(!this.employeeAuthority) return false;
    const hasAccess = authorities.includes(this.employeeAuthority);
    if(hasAccess) {
      return true;
    } else {
      return false;
    }
  }

}

interface IItemOfList {
  category: string;
  title: string;
  icon: string;
  directTo: string;
  authorities: string[];
}