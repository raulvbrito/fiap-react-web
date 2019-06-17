import React, { Component } from 'react';
import axios from 'axios'

class Product extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: props.match.params.id,
            loading: true,
            data: {},
        };
    }
    
    componentDidMount(){
        axios.all([
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}`),
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}/description`)
        ])
        
        .then(([item, description]) => {
            console.log(item, description)
            
            this.setState({
                data: {
                    ...item.data,
                    description: description.data.plain_text,
                },
                loading: false,
            });
            
        })
        .catch((err) => {
            console.log(err)
        });
    }
    
    render () {
        const { id, data, loading } = this.state;
        if(loading){
            return (<div>Carregando...</div>);
        } else {
            return (
                
                <section className="mdl-grid">
                <div class="mdl-cell mdl-cell--6-col">
                
                <img  src={ data.pictures[0].url } />
                </div>
                
                <div class="mdl-cell mdl-cell--6-col">
                <div class="mdl-layout-title">
                {data.title}
                </div>
                <div class="mdl-layout__drawer">
                {data.id}
                </div>
                <div class="mdl-layout__content">
                R$ {data.price}
                </div>
                <div class="mdl-cell--3-col">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Comprar</button>
                </div>
                </div>
                
                
                
                
                
                </section>
                
                
                
                );
            }
            
        }
    }
    
    export default Product;