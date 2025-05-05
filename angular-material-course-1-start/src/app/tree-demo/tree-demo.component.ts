import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';

interface CourseNode {
  name: string;
  children?: CourseNode[];
}

interface CourseFlatNode {
  name: string;
  expandable: boolean;
  level: number;
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'Angular For Beginners',
    children: [
      {
        name: 'Introduction to Angular'
      },
      {
        name: 'Angular Component @Input()'
      },
      {
        name: 'Angular Component @Output()'
      }
    ],
  },
  {
    name: 'Angular Material In Depth',
    children: [
      {
        name: 'Introduction to Angular Material',
        children: [
          {
            name: 'Form Components'
          },
          {
            name: 'Navigation and Containers'
          }
        ],
      },
      {
        name: 'Advanced Angular Material',
        children: [
          {
            name: 'Custom Themes'
          },
          {
            name: 'Tree Components'
          }
        ],
      },
    ],
  },
];

@Component({
  selector: 'tree-demo',
  templateUrl: 'tree-demo.component.html',
  styleUrls: ['tree-demo.component.scss'],
  standalone: false
})
export class TreeDemoComponent implements OnInit {

  //conté les dades que es mostraran
  nestedDataSource = new MatTreeNestedDataSource<CourseNode>();

  //diu a l'arbre com trobar els fills d'un node.
  nestedTreeControl = new NestedTreeControl<CourseNode>(node => node.children);


  //Controlador per a arbres plans
  flatTreeControl = new FlatTreeControl<CourseFlatNode>(
    node => node.level,
    node => node.expandable
  );

  //Funció per transformar un node jeràrquic en un node pla.
  treeFlattener = new MatTreeFlattener(
    (node: CourseNode, level: number): CourseFlatNode => {
      return {
        name: node.name,
        expandable: node.children?.length > 0,
        level
      }
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  //El flatTreeControl per gestionar l'estat dels nodes (expandits/collapsats).
  //El treeFlattener per convertir les dades jeràrquiques a planes.
  flatDataSource = new MatTreeFlatDataSource(this.flatTreeControl, this.treeFlattener);

  ngOnInit() {
    //Assigna les dades jeràrquiques (TREE_DATA) a la font de dades quan es carrega el component.
    this.nestedDataSource.data = TREE_DATA;

    this.flatDataSource.data = TREE_DATA;
  }


  //serveix per decidir si un node és pare i per tant ha de mostrar la fletxa d'expansió o no.
  hasNestedChild(index: number, node: CourseNode) {
    return node?.children?.length > 0;
  }

  hasFlatChild(index: number, node:CourseFlatNode) {
    return node.expandable;
  }
}


