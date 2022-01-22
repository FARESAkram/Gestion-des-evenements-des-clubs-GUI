import {useState} from 'react'
import {useEffect} from "react"
import axios from 'axios'
import {useAlert} from "react-alert";
import Spinner from "../layouts/Spinner/Spinner";
import Moment from 'react-moment';
import {Link, useParams} from 'react-router-dom';
import EvenementCard from '../Acceuil/EvenementCard';
import style from './Evenement.module.css';
import '../Acceuil/styleSheets/EvenementCard.css';

const Evenement = () => {
    const [evenement, setEvenement] = useState({
        nom:"",
        description:"",
        date:null
    })
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)
    const alert = useAlert()
    const {id} = useParams()

    useEffect(()=>{
        const callAPI = async ()=>{
            try{
                const res = await axios.get(`/api/v1/clubs/all/evenements/${id}`)
                const resAll = await axios.get('/api/v1/clubs/all/evenements');
                setEvenement(res.data.data);
                setEvents(resAll.data.data.slice(0,3));
                setLoading(false)
            }catch (err){
                if(err.response.data.msg)
                    alert.error(err.response.data.msg)
                else
                    alert.error("Problem encountered while connecting to the server")
            }
    
        }
        callAPI()
    },[id])
    return (
        <div className='main-container'>

            {
                loading?<Spinner/>:
                    <div className = {style.EvenementDetail}>
                        <div className = {style.evenementHeader}>
                            <h1>{evenement.nom}</h1>
                            <h3><Moment format='DD/MM/yyyy'>{evenement.date}</Moment></h3>
                            <h2>organised by Computer science club</h2>
                            <div className = {style.countdown}>

                            </div>
                        </div>
                        <div className = {style.evenementDescription}>
                            <div >
                                <h2>About The Event</h2>
                                <p>{evenement.description}</p>
                            </div>
                            <div>
                                <img src="/images/kane-reinholdtsen-LETdkk7wHQk-unsplash.jpg" alt="" />
                            </div>
                        </div>
                        <ul id={"events"} className={"cards"}>
                            {
                                events.map(event => (
                                    <li key={event.id}>
                                        <Link to={`/evenement/${event.id}`}><EvenementCard event={event}/></Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

            }
        </div>
    );
}
export default Evenement;