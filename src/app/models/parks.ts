export interface parks {
    user_id : string;
    id : string; 
    title: string;
    img: string;
    type:string;
    desc: string;
    position:{
      lat: number,
      lng: number,
    };

    
  }