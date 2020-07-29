function Team(props) {

    // this.shotSound = new Audio("./sounds/shotSound.mp3");
    // this.scoreSound = new Audio("./sounds/scoreSound.mp3");


    // shotHandler = () => {
    //     let increment;
    //     this.shotSound.play();
    //     if (Math.random() >= 0.4) {
    //         increment = 1;

    //         setTimeout(() => { this.scoreSound.play() }, 200)

    //     } else {
    //         increment = 0;
    //     }


    //     this.setState((state, props) => ({
    //         shots: state.shots + 1,
    //         score: state.score + increment
    //     }))
    // }





    let shotPersentage = "";

    if (props.stats.shots !== 0) {

        shotPersentage =
            <div>
                <strong>Shooting %:</strong> {Math.round(props.stats.score / props.stats.shots * 100)}
            </div>


    }

    return (
        <div className="Team">
            <h2>{props.name}</h2>

            <div className="identity">
                <img src={props.logo} alt={props.name} />
            </div>

            <div>
                <strong>Shots:</strong> {props.stats.shots}
            </div>

            <div>
                <strong>Score:</strong> {props.stats.score}
            </div>

            <div>
                {shotPersentage}
            </div>
            <button onClick={props.shotHandler}>Shoot!</button>

        </div>
    )

}
//===========================================
class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            resetCount: 0,

            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }

        }
        this.shotSound = new Audio("./sounds/shotSound.mp3");
        this.scoreSound = new Audio("./sounds/scoreSound.mp3");
    }

    // shotHandler = (team) => {
    shoot = (team) => {
        const teamStatsKey = `${team}TeamStats` //string concatenation

        let score = this.state[teamStatsKey].score
        let shots = this.state[teamStatsKey].shots

        // let increment;
        this.shotSound.play();
        if (Math.random() > 0.5) {
           score += 1;

            setTimeout(() => { this.scoreSound.play() }, 200)

        } 
        // else {
        //     increment = 0;
        // }


        this.setState((state, props) => ({
            [teamStatsKey]: {

                shots: shots + 1,
                score: score
            }
        }))
    }

    render() {

        return (

            <div className="Game">
                <h2>Welcome to {this.props.venue}</h2>
                <div className="stats" >

                    <Team
                        name={this.props.visitingTeam.name}
                        logo={this.props.visitingTeam.logo}
                        stats={this.state.visitingTeamStats}
                        shotHandler={() => this.shoot('visiting')}
                    />

                    <div className="versus">
                        <h1>VS</h1>
                        <div>
                            <strong>Resets: </strong> {this.state.resetCount}
                            <button>Reset Game</button>
                        </div>

                    </div>

                    <Team
                        name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logo}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')}
                    />

                </div>
            </div>

        )
    }
}
//===========================================
//An App component under which all other components will be added
function App(props) {
    const cats = {
        name: 'Cats',
        logo: './img/cat.png'
    }
    const dogs = {
        name: 'Dogs',
        logo: './img/dog.png'
    }
    const owls = {
        name: 'Owls',
        logo: './img/owl.png'
    }
    const squirrels = {
        name: 'Squirrels',
        logo: './img/squirrel.png'
    }

    return (
        <div className="App">

            <Game
                venue="Cats:Dogs ReUnion  "
                homeTeam={cats}
                visitingTeam={dogs}
            />
            <Game
                venue=" Squirrels:Owls Union "
                homeTeam={owls}
                visitingTeam={squirrels}
            />

        </div>
    )
}


// Render the App
ReactDOM.render(
    <App />,
    document.getElementById('root')
)