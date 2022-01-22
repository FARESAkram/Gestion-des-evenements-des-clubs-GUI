import {useEffect,useState} from 'react'
import SocketClient from "../../utils/SocketClient";
import axios from "axios";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";


const TestComponent = ({user}) => {
    const socket = SocketClient.getSocket()
    const {id} = useParams()
    const [msgs,setMsgs] = useState([])
    const [inpt, setInpt] = useState("")
    const [event,setEvent] = useState({
        id:'',
        idClub:''
    })
    socket.on('sendMessage',data=>{
        setMsgs([...msgs,data])
    })
    useEffect( ()=>{
        axios.get(`/api/v1/clubs/all/evenements/${id}/message`).then((res)=>{
            setMsgs(res.data.data)
        })
        axios.get(`/api/v1/clubs/all/evenements/${id}`).then(res=>{
            setEvent(res.data.data)
        })
        socket.emit('join',{id_evenement:id})
    },[id])
    return (
        <div>
            <input type="text" value={inpt} onChange={(e)=>setInpt(e.target.value)}/>
            <button type={'submit'} onClick={()=>{
                setInpt('')
                if(user.data){
                    console.log(user.data)
                    socket.emit('sendMessage',{
                        id_user:user.data.id_user,
                        id_evenement:id,
                        contenue:inpt
                    })
                }
                setMsgs([
                    ...msgs,
                    {
                        id_user:user.data.id_user,
                        id_evenement:id,
                        contenue:inpt
                    }
                ])
            }}> sendMessage</button>
            <ul>
                {msgs.map((e,index)=><li key={index}>{e.contenue}</li>)}
            </ul>

        </div>
    );
};

const mapStateToProps = state =>({
    user:state.auth.user
})

export default connect(mapStateToProps)(TestComponent);