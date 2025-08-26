import profilePic from './assets/profile.jfif'

function Card(){
    return(
        <div className="card">
            <img className="card-image" src={profilePic} alt="profile picture" />
            <h2 className="card-title">Eyce</h2>
            <p className="card-text">I am a web developer and gamer</p>
            
        </div>
    );
}

export default Card