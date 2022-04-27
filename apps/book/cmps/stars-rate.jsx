export class StarsRate extends React.Component {
    state = {
        originalRate: this.props.rate,
        rate: this.props.rate,
    }

    emptyStar = String.fromCharCode(9734)
    fullStar = String.fromCharCode(9733)

    onMouseIn = (idx) => {
        this.setState({ rate: idx + 1 })
    }

    onMouseOut = () => {
        this.setState((prevState) => ({ ...prevState, rate: prevState.originalRate }))
    }

    onStarClick = (idx) => {
        this.setState({ originalRate: idx + 1 }, () => this.props.onChangeRate(idx + 1))
    }

    render() {
        const stars = []
        for (let i = 0; i < 5; i++) {
            stars.push(i < this.state.rate ? this.fullStar : this.emptyStar)
        }

        return <section className="stars-rate">
            <ul className="clean-list">
                {stars.map((star, idx) =>
                    <li key={idx}
                        onMouseEnter={() => this.onMouseIn(idx)}
                        onMouseLeave={this.onMouseOut}
                        onClick={() => this.onStarClick(idx)}>
                        {star}
                    </li>)}
            </ul>
        </section>
    }
}