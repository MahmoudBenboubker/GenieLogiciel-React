import React from 'react'
import { Jumbotron as Jumbo, Container} from 'react-bootstrap'
import styled from 'styled-components';
import cover from '../resource/nav-image.jpg'

const Styles = styled.div`

    .jumbotron{
        background : url(${cover}) no-repeat fixed bottom;
        background-size: cover;
        color: #fff;
        height: 400px;
        position: relative;
        z-index: -2;
    }

    .overlay {
        background-color: #000;
        opacity : 0.4;
        position : absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;  
    }
`

export const Jumbotron= () => {
 
        return (
            <Styles>
                <Jumbo fluid className="jumbo">
                    <div className="overlay"></div>
                    <Container>
                        <h1>Bienvenue sur EMI Net.</h1>
                        <p>In non feugiat dui. Etiam lacus lectus, vehicula eu aliquet et, pharetra vel purus. Nullam faucibus vel odio sit amet maximus. Aliquam ut tellus felis. Maecenas et sagittis felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed accumsan mauris eu scelerisque semper.</p>
                        <p>Sed posuere risus at tristique convallis. Donec dictum dolor fermentum erat dapibus, quis lobortis orci bibendum. Phasellus neque lorem, faucibus et felis sed, rutrum auctor nulla. Praesent libero arcu, lacinia vel enim eget, pellentesque egestas diam. Maecenas commodo feugiat mauris, vel gravida orci lobortis in. Maecenas accumsan vestibulum risus. Praesent ligula tellus, tempor vitae iaculis eget, faucibus a velit. Nulla sollicitudin, purus commodo.</p>
                    </Container>
                </Jumbo>
            </Styles>
        )
    
}
