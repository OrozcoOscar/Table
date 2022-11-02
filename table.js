/**
     * Genera una Tabla 
     * @param dataJson Array de Objetos (las filas de la tabla).
     * @param padre  Contenedor padre donde se insertara la tabla (debe ser un selector).
     * @param id Propiedad para activar la vista del numero de filas.
     * @param maxRow Numero máximo de filas a mostrar inicialmente.
     * @param option Configuración de botones Ejem. [{
                button: "Eliminar",
                onClick: "eliminar" -> la función recibe 2 valores (el mismo botón,el id de la fila)
            }]
     */
class Table{
    constructor(dataJson=[],padre="body",option=[],id=true,maxRow=50){
        this.dataJson=dataJson
        this.id=id
        this.maxRow=dataJson.length>maxRow:maxRow:dataJson.length
        this.padre=padre
        this.option=option
        this.table=document.createElement("table")
        this.keys
        this.select
    }

    static dragit(event) {
        this.select = event.target;
    }
    static dragover(e) {
        let destino=e.target
        let table=destino.parentNode.parentNode
        let th = Array.from(destino.parentNode.children);
        let a=th.indexOf(this.select)
        let b=th.indexOf(destino)
        let rows=Array.from(table.children)
        rows.map(r=>{
            let col = Array.from(r.children);
            if (a < b)
                col[b].after(col[a]);
            else col[b].before(col[a]);
        })
    }
    fill(inicial,final){
        for (let i = inicial; i < final; i++) {
            let row=this.dataJson[i]
            try {
                if(row){
                    let tr=document.createElement("tr")
                    tr.id="tr-"+i
                    this.keys.map((col,e)=>{
                    let td= document.createElement("td")
                    if(e==0 && col=="#")td.innerHTML=i+1 
                    else if(col=="≡"){
                        let aux=""
                        this.option.map(op=>
                                aux+=`<button onclick="${op.onClick}(this,'tr-${i}')">${op.button}</button>`)

                                td.innerHTML+= `<div class="opc-row">
                                    <i class="fa-solid fa-sliders" onclick="toggle('#opc-button-${i}','active-btn')" ></i>
                                    <div class="opc-button" id="opc-button-${i}">
                                        ${aux}
                                    </div>
                                </div>`
                                
                    }
                    else {
                        td.innerHTML=row[col]||"-----"
                    }
                    tr.append(td)
                    })
                    this.table.append(tr)
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    /**
     * Inserta la Tabla 
     * @param inicial indica desde donde inicia a pintar la Tabla;esto puede estar vacío.
     * @param final  indica hasta donde pinta la Tabla;esto puede estar vacío.
     */

    generate(inicial=0,final=this.maxRow){
        this.keys=(this.id)?["#"]:[]
        document.querySelector(this.padre).innerHTML=""
        this.table.innerHTML=""
        //obtenemos las keys del json
        this.dataJson.map(r=>{
            for (let name in r){
                if(!this.keys.includes(name))
                    this.keys.push(name)
            }
        })
        
        // creamos la cabezera 
        let header=document.createElement("tr")
        this.keys.map(h=>{
            let th= document.createElement("th")
            th.setAttribute("style","cursor: move")
            th.draggable=true
            th.setAttribute("ondragstart","Table.dragit(event)")
            th.setAttribute("ondragover","Table.dragover(event)")
            th.innerHTML=h
            header.append(th)
        })
        if(this.option.length>0){
            this.keys.push("≡")
            let th= document.createElement("th")
            th.innerHTML="≡"
            header.append(th)
        }
        this.table.append(header)
        //rellenamos la tabla
        this.fill(inicial,final)
        
        //guardamos la tabla en un div 
        let contTable=document.createElement("div")
        contTable.innerHTML=`<div class="setting-table">
                            <div>Mostrar</div>
                            <div>
                            <div class="opc-t">
                                <span>
                                Desde:
                                </span>
                                <select id="row_table">
                                ${
                                    this.dataJson.map((_,i)=>`<option value=${(i+1)} ${(inicial==i)?'selected="selected"':""}>${(i+1)}</option>`).toString().replace(/,/g,"")
                                }
                                </select>
                                <span>
                                Hasta:
                                </span>
                                <select id="nRow_table">
                                ${
                                    this.dataJson.map((_,i)=>`<option value=${(i+1)}  ${(final==i+1 || (this.dataJson.length-1<final && this.dataJson.length-1==i))?'selected="selected"':""}>${(i+1)}</option>`).toString().replace(/,/g,"")
                                }
                                </select>
                            </div>
                            
                            </div>
                        </div>
        
        `

        contTable.append(this.table)
        document.querySelector(this.padre).append(contTable)
        let update=()=>{
            this.generate(
                document.querySelector("#row_table").value - 1,
                document.querySelector("#nRow_table").value)
    }
        document.querySelector("#nRow_table").addEventListener("change",update)
        document.querySelector("#row_table").addEventListener("change",update)
        return contTable
    }
  
}
