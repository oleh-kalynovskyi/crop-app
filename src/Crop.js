import React, { Component } from 'react';
// import { RiArrowUpDownFill, RiArrowLeftRightLine } from 'react-icons/ri';


export default class Crop extends Component {
    state = {
        width: '',
        height: '',
        image: null,

        onImageChange: false

        // overturn: false,
        // specular: false
    }

    overturn = () => {
        this.setState({ 
            overturn: !this.state.overturn 
        })
    }
    specular = () => {
        this.setState({ 
            specular: !this.state.specular 
        })
    }

    validateOnChange = event => {
        const input = event.target;
        // const form = input.form;
        const value = input.value;
    
        this.setState({
            // ...this.state[form.name],
            [input.name]: value
        });
    };

    onImageChange = (e) => {
        let img = e.target.files[0];
        this.setState({
            image: URL.createObjectURL(img),
            onImageChange: true
        });
    }

    updateCanvas = () => {
        var image = new Image(),
            canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d');
            
        let w = this.state.width,
            h = this.state.height;
        
        image.src =  this.state.image;

        ctx.drawImage(image,
            0, 0,  
            w, h,  
            0, 0,  
            w, h);  
    };

    download_img = function(el) {
        let canvas = document.getElementById('canvas');
        let tagA = document.createElement("a");
        document.body.appendChild(tagA);
        tagA.href = canvas.toDataURL();
        tagA.download = "canvas-image.png";
        tagA.click();
        document.body.removeChild(tagA);
    };

    render() {
        const { height, width } = this.state;
        return (
            <div className="main-content">
            <ul className="side-menu">
            <li>
                <label className="file-upload">
                    <input type="file" onChange={this.onImageChange}/>
                    <p>Upload img</p>
                </label>
            </li>
                <li>
                Height: <input
                    autoComplete="off"
                    name="height"
                    id="height"
                    type="number"
                    value={height}
                    onChange={this.validateOnChange}
                />
                Width:<input
                    autoComplete="off"
                    name="width"
                    id="width"
                    type="number"
                    value={width}
                    onChange={this.validateOnChange}
                />
                </li>
                {/* <li>
                    <span style={{cursor:"pointer", border:"1px solid black", display: "inline-block"}} 
                        onClick={ this.overturn }>
                        <RiArrowUpDownFill/>
                    </span>
                    <span style={{cursor:"pointer", border:"1px solid black", display: "inline-block"}} 
                        onClick={ this.specular }>
                        <RiArrowLeftRightLine/>
                    </span>
                </li> */}
                <li>
                    <button onClick={this.updateCanvas}> Crop </button>
                </li>
                <li>
                    <button id="download" onClick={this.download_img}> Download </button>
                </li>
            </ul>

            <div id="img-box" 
                // className={ this.state.overturn ? "r180" : "r0" }
            > 
            <img 
                // className={ this.state.specular ? "s-1" : "s1" }
                id="uploadImg" 
                crossOrigin="Anonymous" 
                src={this.state.image} 
                height="100%" 
                width="100%"
                /> 
            <canvas 
                id="canvas" 
                height={height} 
                width={width}>
            </canvas>
            </div> 
            {/* { this.updateCanvas ? <a id="download" download="cropImage.png" href="" onClick={this.download_img}> Download to myImage.jpg </a>
            : <p> TTTTTTTTTTTT </p>} */}
        </div>
        )
    }
}
