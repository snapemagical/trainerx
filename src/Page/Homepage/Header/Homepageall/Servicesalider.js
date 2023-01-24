// import "./styles.css";
import Carousel from 'react-material-ui-carousel';
import Container from '@mui/material/Container'

export default function App() {

  var items = [
    {
      image:"https://static.wixstatic.com/media/83d722_cd21cf956b7c46108649ef96c1845da8~mv2.png/v1/crop/x_0,y_0,w_566,h_566/fill/w_220,h_220,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Neeraj%20Laungani.png",
        name: "Capt. Neeraj Laungani",
        post: "Air Arabia",
        title:"Such a wonderful experience, had to renew my ATPL, just had to call them once - submitted my documents and they took care of the rest. Go MAV!!"
    },
   
    {
      image:"https://static.wixstatic.com/media/83d722_61e7772da8a84a469b637e7cfde1fc4f~mv2.png/v1/crop/x_0,y_7,w_573,h_573/fill/w_220,h_220,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Pratap%20Chawla.png",
      name: "Capt. Pratap Chawla",
      post: "Emirates",
      title:"Thank you for providing me the superb services I wish u all the very best keep growing.."
  },

  {
    image:"https://static.wixstatic.com/media/83d722_ebdee1d59d984898ac3e2046f4d4d146~mv2.jpeg/v1/crop/x_0,y_41,w_917,h_917/fill/w_220,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Mustajib.jpeg",
    name: "Capt. Mustajib Ahmed khan",
    post: "Gulf Air",
    title1: "PS: Please make ur site a bit faster",
    title:"Finally I found a one-stop-shop for all my regulatory work. Much recommended site if anyone is planning renew you'er ATPL, these guys will make your life much easier. "
},

{
  image:"https://static.wixstatic.com/media/83d722_098140e3b2604cdaa75afe77329ff8e5~mv2.jpeg/v1/crop/x_17,y_0,w_306,h_306/fill/w_220,h_220,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Parag.jpeg",
  name: "Capt. Parag Saxena",
  post: "Etihad Airways",
  title:"One word for these guys, RELIABLE. Don't think I need to explain this now. Best wishes to MAV, see you guys soon."
},

{
  image:"https://static.wixstatic.com/media/83d722_69252ba3defb4a8394e9d5222037de41~mv2.png/v1/crop/x_191,y_118,w_310,h_310/fill/w_220,h_220,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Pratik%20Goal.png",
  name: "Capt. Pratik Goel",
  post: "Hongkong Airlines",
  title:"Very Helpful, didn't have to worry about a thing."
},
  ];


  return (<>
    <Carousel navButtonsAlwaysInvisible={true} animation="slide" activeIndicatorIconButtonProps={{className: "activeIndicator"}}>
    {
        items.map( (item, i) => <Item key={i} item={item} /> )
    }
</Carousel>
  </>);

  function Item(props)
{
    return (
      <Container>
        <div className="single_slide custom_slide_col">
          <div>
            <img
              className="imageCarousel"
              src={props.item.image}
              alt={props.item.name}
            />
          </div>
          <div className='cont_area'>
          
            <p>{props.item.title}</p>
            <p>{props.item.title1}</p>
            <h3
              onClick={() => {
                window.location.href = props.item.link;
              }}
            >
              {props.item.name}
            </h3>
            <h5>{props.item.post}</h5>
          </div>
        </div>
      </Container>
    );
}
}
