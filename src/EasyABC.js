import React ,{ Component } from 'react';
import alphabets from './alphabets.json'
import classNames from 'classnames';

class EasyABC extends Component {
	constructor(props){
		super(props);
		this.state = {
			alphabets: alphabets,
			currentPosition: 0,
			currentTick:0,
			random: false,
			sound: true
		};
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.playSound = this.playSound.bind(this);
		this.switchRandom = this.switchRandom.bind(this);
		this.switchSound = this.switchSound.bind(this);
		this.manualPlaySound = this.manualPlaySound.bind(this);
	}

	switchRandom(){
		this.setState({random: !this.state.random});
	}

	switchSound(){
		this.setState({sound: !this.state.sound});
	}

	componentDidMount(){
		let letterSound = document.querySelector('audio[data-key="letter"]');
		// let wordSound = document.querySelector('audio[data-key="word"]');
		if (this.state.currentPosition < 0){
			letterSound.play();
		}
	}

	componentDidUpdate(){
		this.playSound();
	}

	playSound(){
		let letterSound = document.querySelector('audio[data-key="letter"]');
		let wordSound = document.querySelector('audio[data-key="word"]');

		if (this.state.sound){
			if(this.state.currentTick === 0){
				letterSound.currnetTime = 0;
				letterSound.play();
			}else {
				wordSound.currnetTime = 0;
				wordSound.play();
			}
		}

	}

	randomNumber(min,max){
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	manualPlaySound(){
		let letterSound = document.querySelector('audio[data-key="letter"]');
		let wordSound = document.querySelector('audio[data-key="word"]');

		if(this.state.currentTick === 0){
			letterSound.currnetTime = 0;
			letterSound.play();
		}else {
			wordSound.currnetTime = 0;
			wordSound.play();
		}
	}

	next(){
		console.log("next click");
		if (this.state.random){
			if(this.state.currentTick < 2){
				this.setState({currentTick: this.state.currentTick + 1})
			}else{
				this.setState({currentTick: 0, currentPosition: this.randomNumber(0,25)});
			}
		}else{		
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
	}
	prev(){
		if(this.state.currentPosition > 0)
		{
			this.setState({currentPosition: this.state.currentPosition - 1});
		}else{
			this.setState({currentPosition: this.state.alphabets.length - 1});
		}
		this.playSound()
	}
	render(){
		let showImage = this.state.currentTick !==0 ? true : false;
		let showWord = this.state.currentTick ===2 ? true : false;
		// console.log(alphabets);
		return(
			<div className="game">
				<span className="random-label">Rendom Letters:  </span>
				<label className="switch">
					<input type="checkbox" defaultValue="false" checked={this.state.random} onClick={this.switchRandom}/>
					<div className="slider round"></div>
				</label>

				<span className="random-label">Sound:  </span>
				<label className="switch">
					<input type="checkbox" defaultValue="false" checked={this.state.sound} onClick={this.switchSound}/>
					<div className="slider round"></div>
				</label>

			 <div className="option">
				 <div className="fields">
				 	<div className="field-block">
				 		{this.state.alphabets[this.state.currentPosition].letter}
				 	</div>
				 	<audio src={this.state.alphabets[this.state.currentPosition].letterSound} 
				 		data-key="letter"/>
				 </div>
				 {this.state.currentTick} :  
				 {this.state.currentPosition}
				 <div className="buttons">
				 	<a onClick={this.prev} className="button prev">Previous</a>
				 	<a onClick={this.manualPlaySound} className="button sound">Play Sound</a>
				 	<a onClick={this.next} className="button next">Next</a>
				 </div>
				 <div className="fields">
				 	<div className="field-block">
				 		<div className="left-field">
				 			<div className={classNames('placeholder-span',{hide: showImage})}> click next to view image</div>
				 			<img className={classNames('letter-image',{hide: !showImage})}
				 			 		alt={this.state.alphabets[this.state.currentPosition].word}
				 			   src={this.state.alphabets[this.state.currentPosition].image} />
				 			<audio src={this.state.alphabets[this.state.currentPosition].wordSound} 
				 					data-key="word"/>
				 		</div>
				 		<div className="right-field">
				 			<div className={classNames('placeholder-span',{hide: showWord})}>click next to view spelling</div>
				 			<div className={classNames('word',{hide: !showWord})}>
				 				{this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
				 				<audio src={this.state.alphabets[this.state.currentPosition].wordSound} 
				 					data-key="word"/>
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