import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
/*importar los resursos que se ocuparan*/
const tablazapatos =[  /*cree la constante de los zapatos */
  { año:"2020", marca:"Adidas", medida:"5"},
  {año:"2021", marca:"Star", medida:"5"},
  { año:"2021", marca:"Leno", medida:"8"},
  { año:"2020", marca:"Adidas", medida:"6"},
  { año:"2020", marca:"Star", medida:"6"},
];
const paginacionOpciones={
  rowsPerPageText: 'Filas por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}
/*cree las clases donde estaran colocadas cada item */
class App extends Component {
  state={
    busqueda: '',
    existencia: [],
    columnas:[]
  }

  onChange=async e=>{/*onChange es para agregar */
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarElementos();
  }

  asignarColumnas=()=>{ /*le di a cada columna un luagar*/

    const columnas = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true
      },
      {
        name: 'Año',
        selector: 'año',
        sortable: true
      },
      {
        name: 'Marca',
        selector: 'marca',
        sortable: true,
        grow: 3
      },
      {
        name: 'Medida',
        selector: 'medida',
        sortable: true,
        right:true
      }
    ];

    this.setState({columnas: columnas});
  }
/*eeste es donde se escoje cada elemnto, esta se busca en la tabla llamada busqueda .state */
  filtrarElementos=()=>{
    var search=tablazapatos.filter(item=>{
      if(item.año.toString().includes(this.state.busqueda) ||
      item.marca.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
      item.medida.toLowerCase().includes(this.state.busqueda)
      ){
        return item;   /*despues de buscar te lo regresa */
      }
    });
    this.setState({existencia: search});/*e */
  }

  crearIndex=()=>{
    var contador=1;  /*cree el index con un contador para esto utilize el .map . recuerden que el contador debe de aumnetar */
    tablazapatos.map(elemento=>{
      elemento["id"]=contador;
      contador++;
    })
  }
/*cree un componente que da la axistencia del producto */
  componentDidMount(){
    this.crearIndex();
    this.asignarColumnas();
    this.setState({existencia: tablazapatos});
  }
  
render(){
  /*esto es de la barra de busqueda y algunos estilos, aqui es donde le podemos cambiar al estilo */
  return (
    <div className="table-responsive">
      <div className="barraBusqueda">
            <input
              type="text"
              placeholder="Buscar"
              className="textField"
              name="busqueda"
              value={this.state.busqueda}
              onChange={this.onChange}   /*boton de buscar */
            />
            <button type="button" className="btnBuscar" /*onClick={onClear}*/>
              {" "}
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

      <DataTable  /*esta es la tabla con las paginas dentro */ 
      columns={this.state.columnas}
      data={this.state.existencia}
      title="Todo lo que necesitas "
      pagination
      paginationComponentOptions={paginacionOpciones}
      fixedHeader
      fixedHeaderScrollHeight="600px"
      noDataComponent={<span>no contamos con existencias</span>}
      />
    </div>
  );
}
}
export default App;
