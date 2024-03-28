import * as React from 'react';
import styles from './SliderV1.module.scss';
import type { ISlide, ISliderV1Props, ISliderV1State} from './ISliderV1Props';
import { getSP } from '../../sp/pnpjsConfig';
import { SPFI } from "@pnp/sp";
import "@pnp/sp/items/get-all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const animaciones = [
  "out:circle:center",
  "in:wipe:bottom-right",
  "in:circle:hesitate",
  "in:square:bottom-right",
  "in:wipe:left",
  "in:wipe:up",
  "in:wipe:top-left",
  "in:wipe:top-right",
  //"in:wipe:cinematic",
  "in:diamond:hesitate",
  "in:polygon:opposing-corners",
  //"in:custom:circle-swoop",
];

// const configuracion = {
//   contenedorZize: "800px",
//   descriptionItem: {
//     position: "right",
//     distance: "%",
//   },
// };

export default class SliderV1 extends React.Component<ISliderV1Props, ISliderV1State, {}> {

  private _sp: SPFI;
  
  constructor(props:ISliderV1Props){

    super(props);

    this._sp = getSP();

    this.state = {sliders:[], itemActual:null, zIndex:0 };
  }


  componentDidMount(): void {

    this.getSlide();
  }


  getImage = (item) => {

    const urlSite =  this.props.context.pageContext.web.absoluteUrl;

    if(item.Imagen){

      var img = JSON.parse(item.Imagen);
      
      return img.serverRelativeUrl;
    }
    else if(item.Imagen){

      return urlSite + "/Lists/Slider%20v1/Attachments/" + item.ID + "/" + item.imagen.fileName;
    }
    else {
      
      return '';
    }
  }

  
  setSlide(indx):void{

    const sliders = this.state.sliders;
    const slide = sliders[indx];

    slide.animation = 'none';
    const zIndex = this.state.zIndex + 1;

    this.setState({sliders: sliders});

    setTimeout(()=>{

      slide.zIndex = zIndex;
      slide.animation = animaciones[7];
  
      this.setState({zIndex: zIndex, sliders: sliders});

    },0);

  }


  async getSlide(){

    const items = await this._sp.web.lists.getByTitle('Slider v1').items();

    const slides:ISlide[] = items.map(e=> ({
      id:e.Id,
      title:e.Title,
      descrip:e.Descripcion,
      image:this.getImage(e),
      animation:''
    }));

    this.setState({sliders:slides, zIndex:1});
  }

  public render(): React.ReactElement<ISliderV1Props> {


    const {sliders} = this.state;

    return (
      <section className={styles.sliderV1}>
        <div className='contenedor'>
          
          {sliders.map(e=> (
          
              <div key={'item'+e.id} className={"diapositiva "} 
              style={{zIndex: e.zIndex > 0 ? e.zIndex : 'none'}}
              transition-style={e.animation}
              >
                <div className="descriptionItem">
                  <div className="contenido">
                    <h2>{e.title}</h2>
                    <p>{e.descrip}</p>
                  </div>
                </div>
                <img
                  src={e.image}
                  className="slider_img"
                />
              </div>
            ))
          }

          <div className="btnCirculares">
            {
              sliders.map((e, indx)=> (<span onClick={this.setSlide.bind(this, indx)}></span>))
            }
          </div>
        </div>
      </section>
    );
  }
}
