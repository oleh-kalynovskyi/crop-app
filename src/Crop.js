import React, { Component } from 'react';
// import { RiArrowUpDownFill, RiArrowLeftRightLine } from 'react-icons/ri';


export default class Crop extends Component {
    state = {
        width: '',
        height: '',
        image: null,
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
        const value = input.value;
    
        this.setState({
            [input.name]: value
        });
    };

    onImageChange = (e) => {
        let img = e.target.files[0];
        this.setState({
            image: URL.createObjectURL(img)
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
                    <input type="file" accept="image/*" onChange={this.onImageChange}/>
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
                <li>
                    <button onClick={this.updateCanvas}> Crop </button>
                </li>
                <li>
                    <button id="download" onClick={this.download_img}> Download </button>
                </li>
            </ul>

            <div id="img-box"> 
            <img 
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
        </div>
        )
    }
}
