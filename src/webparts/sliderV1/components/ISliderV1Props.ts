export interface ISliderV1Props {
  description: string;

  context:any;
}

export interface ISliderV1State {
  sliders:ISlide[];



  itemActual:ISlide;
  zIndex:number;
}


export interface ISlide {

  id:number;
  title:string;
  descrip:string;
  image:string;

  zIndex?:number;
  animation?:string;
}
