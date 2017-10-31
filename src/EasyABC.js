import React ,{ Component } from 'react';
import alphabets from './alphabets.json'
import classNames from 'classnames';

class EasyABC extends Component {
	constructor(props){
		super(props);
		this.state = {
			alphabets: alphabets,
			currentPosition: 0,
			currentTick:0
		};
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	next(){
		console.log("next click");
		if(this.state.currentPosition === this.state.alphabets.length - 1){
			if (this.state.currentTick < 2){
				this.setState({currentTick: this.state.currentTick + 1})
			}else{
				this.setState({currentTick: 0,currentPosition: 0})
			}
		}else{
			if (this.state.currentTick < 2){
				this.setState({currentTick: this.state.currentTick + 1})
			}else{
				this.setState({currentPosition: this.state.currentPosition + 1, currentTick: 0});
			}
		}
	}
	prev(){
		if(this.state.currentPosition > 0)
		{
			this.setState({currentPosition: this.state.currentPosition - 1});
		}else{
			this.setState({currentPosition: this.state.alphabets.length - 1});
		}

	}
	render(){
		let showImage = this.state.currentTick !==0 ? true : false;
		let showWord = this.state.currentTick ===2 ? true : false;
		// console.log(alphabets);
		return(
			<div className="game">
			 <div className="option">
				 <div className="fields">
				 	<div className="field-block">
				 		{this.state.alphabets[this.state.currentPosition].letter}
				 	</div>
				 </div>
				 {this.state.currentTick} :  
				 {this.state.currentPosition}
				 <div className="buttons">
				 	<a onClick={this.prev} className="button prev">Previous</a>
				 	<a className="button sound">Play Sound</a>
				 	<a onClick={this.next} className="button next">Next</a>
				 </div>
				 <div className="fields">
				 	<div className="field-block">
				 		<div className="left-field">
				 			<div className={classNames('placeholder-span',{hide: showImage})}> click next to view image</div>
				 			<img className={classNames('letter-image',{hide: !showImage})}
				 			 		alt={this.state.alphabets[this.state.currentPosition].word}
				 			   src={this.state.alphabets[this.state.currentPosition].image} />
				 		</div>
				 		<div className="right-field">
				 			<div className={classNames('placeholder-span',{hide: showWord})}>click next to view spelling</div>
				 			<div className={classNames('word',{hide: !showWord})}>
				 				{this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
				 			</div>
				 		</div>
				 	</div>
				 </div>
			 </div>
			</div>
		)
	}
}

export default EasyABC;