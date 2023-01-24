// import "./styles.css";
import Carousel from 'react-material-ui-carousel';
import Container from '@mui/material/Container'

export default function App() {

  var items = [
    {
      image:"https://static.wixstatic.com/media/83d722_ed11c929c5aa44ffa96a8d305e42e129~mv2.png/v1/crop/x_0,y_15,w_340,h_340/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Appu1.png",
        name: "APOORVAJIT SINGH GAREWAL",
        post: "Co-Founder",
        title:"Apoorvajit has played a crucial role in the conceptualisation of MAV from the day one. Over 10 years of experience in Aviation as Professional Pilot with Etihad Airways and Emirates. Holding a MSc in Air Safety Management from City, University of London, Apoorvajit has expertise in providing solutions to the to problems ailing the Aviation Industry. Along with being a Pilot, Apoorv is a Certified Python Programmer which puts him in unique position to provide the most cutting edge technological solutions to Aviation Industry."
    },
   
    {
      image:"https://static.wixstatic.com/media/83d722_00b0d76eaaa24544b023d05e633a0782~mv2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Manpinder.jpg",
      name: "MANPINDER SINGH NAGI",
      post: "Co-Founder",
      title:"Being an Aviation Enthusiast, Manpinder comes from media and financial industry. He received his Masters with Distinction in International Buisness from Curtin University and he's got the eye for what makes a business succeed. Manpinder has overseen various projects while working with American Express, News Corp and comes with years of experience in the business sector. As a motivated, results-oriented collaborator, he's helped to make us what we are today."
  },
  ];


  return (<>
    <Carousel nav={true} navButtonsAlwaysInvisible={true} animation="slide" activeIndicatorIconButtonProps={{className: "activeIndicator"}}>
    {
        items.map( (item, i) => <Item key={i} item={item} /> )
    }
</Carousel>
  </>);

  function Item(props)
{
    return (
      <Container>
        <div className="single_slide">
          <img
            className="imageCarousel"
            src={props.item.image}
            alt={props.item.name}
          />
          <h2
            onClick={() => {
              window.location.href = props.item.link;
            }}
          >
            {props.item.name}
          </h2>
          <h5>{props.item.post}</h5>
          <p className="f-15">{props.item.title}</p>
        </div>
      </Container>
    );
}
}
