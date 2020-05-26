export interface parksInterface {
    user_id : string;
    id : string; 
    title: string;
    img: string;
    type:string;
    desc: string;
    name_img: string;
    position:{
      lat: number,
      lng: number,
    };
    reactions: {}

    
  }