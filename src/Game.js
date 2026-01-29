console.log("Game start");
import Field from './Field';
import ChipButton from '../src/ChipButton';


class Game {

    constructor () {
        this.chipID = 1;
        this.gameStatus = {
            fields: [],
            playerHistory: []
        };
        this.buttons = {};
        this.changedFields = [];
    }
	
	async init () {
		
        document.getElementById('btnUndo').addEventListener( 'click', () => {
            if (this.changedFields.length > 0) {
                const lastChangedField = this.changedFields[this.changedFields.length - 1];
                if (!lastChangedField) {
                    this.gameStatus.fields.forEach( field => { field.clear();});
                    
                    this.gameStatus.fields.forEach( field => {
                        field.removeLastPlayFromHistory();
                        field.update();
                    });
                    
                } else {
                    this.undo(lastChangedField);
                }
            }

            this.changedFields.pop();
                
            
            
        });

        document.getElementById('btnClear').addEventListener( 'click', () => {
            this.gameStatus.fields.forEach( field => { field.clear();});
        });

        document.getElementById('btnDouble').addEventListener( 'click', () => {

            this.gameStatus.fields.forEach (field => {
                field.double();
                field.updateChipsHistory(this.chipID);
                
            });

            this.changedFields.push(null)
        });

        const buttons = document.querySelectorAll('.chip-btn');
        
        buttons.forEach( (el, index) => {
            const chipID = index + 1;
            const chipButton = new ChipButton(el, chipID);
            this.buttons[el.name] = chipButton;
            
            chipButton.getEl().addEventListener( 'click', (e) => { 
                this.updateButtonState(e);
            });
        });

        const fields = document.querySelectorAll('.roulette-panel-grid .cell');

        fields.forEach((el, index) => {
            const field = new Field(el, index); 
            field.create();
            this.gameStatus.fields.push(field);
            
            field.getDOM().addEventListener('click', () => {
                field.onClick(this.chipID);
                field.updateChipsHistory(this.chipID);
                this.changedFields.push(field);
            });
        });

	}

    undo ( currentField) {
        currentField.undo();
        currentField.updateChipsHistory(this.chipID);
    }

    updateButtonState (el) {
        const buttons = document.querySelectorAll('.chip-btn');
        buttons.forEach( button => {
            button.classList.remove('chip-disabled');
        });
        
        const currentButton = this.buttons[el.currentTarget.name];
        currentButton.getEl().classList.add('chip-disabled');
        this.chipID = currentButton.getID();
    }

	
}

export default  Game;