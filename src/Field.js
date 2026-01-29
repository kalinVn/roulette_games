
class Field {

    constructor (cellDOM, index) {
        this.html = '';
        this.cellDOM = cellDOM;
        this.position = index;
        this.name = `grid_cell_${index}`;
        
        this.values = {
            btn_1: 0,
            btn_2: 0,
            btn_3: 0
        };

        this.valuesUpdates = {
            btn_1: [],
            btn_2: [],
            btn_3: [],
        };

        this.lastChipID = 1;
    }
	
	async create ( ) {
        let row = document.createElement('div');
        row.classList.add('cell-chips-col-conainer');

        // TODO remove code duplication
        let currentCol = document.createElement('div');
        let currentColChipsInfo = document.createElement('p');
        currentColChipsInfo.classList.add('cell-chips-col-title');
        currentColChipsInfo.textContent = '';
        currentCol.appendChild(currentColChipsInfo);
        currentCol.classList.add('cell-chips-col-' + 1);
        row.appendChild(currentCol);
        

        currentCol = document.createElement('div');
        currentColChipsInfo = document.createElement('p');
        currentColChipsInfo.classList.add('cell-chips-col-title');
        currentColChipsInfo.textContent = '';
        currentCol.appendChild(currentColChipsInfo);
        currentCol.classList.add('cell-chips-col-' + 2);
        row.appendChild(currentCol);

        currentCol = document.createElement('div');
        currentColChipsInfo = document.createElement('p');
        currentColChipsInfo.classList.add('cell-chips-col-title');
        currentColChipsInfo.textContent = '';
        currentCol.appendChild(currentColChipsInfo);
        currentCol.classList.add('cell-chips-col-' + 3);
       
        row.appendChild(currentCol);
        this.cellDOM.appendChild(row);
	}

    update () {
        // TODO remove magic numbers
        for (let i = 1; i < 4; i++ ) {
            const currentHistoryArr = this.valuesUpdates[`btn_${i}`];
            if (currentHistoryArr.length > 0) {
                const currentHistoryArrLength = currentHistoryArr.length;
                const lastPlay = currentHistoryArr[currentHistoryArrLength - 1]
                for (let j = 0; j < lastPlay; j++){
                    this.onClick(i);
                }
            }
        }

    }

    onClick (chipID) {

        this.lastChipID = chipID;
        this.values[`btn_${chipID}`] = this.values[`btn_${chipID}`] + 1;
        
        const img = document.createElement('img');
       
        img.src = `/assets/images/chip-background-${chipID}.png`;
        
        let row = this.cellDOM.querySelector('.cell-chips-col-conainer');
        let currentChipsCol = row.querySelector('.cell-chips-col-' + chipID);
        let currentColChipsInfo = currentChipsCol.querySelector('.cell-chips-col-title');
        
        const currentChipsColImages = currentChipsCol.querySelectorAll('img');
        currentColChipsInfo.textContent = this.values[`btn_${chipID}`];

        if (currentChipsColImages.length >= 5 ) {
            return;
        }

        currentChipsCol.appendChild(img);
        
        
        let imgHeight = currentChipsCol.querySelector('img').height ;
        
        const newImageArr = currentChipsCol.querySelectorAll('img');
        currentChipsCol.appendChild(img);
    
        
        let marginImg = 0;
        if (newImageArr.length > 1) {
            const marginTop = currentChipsCol.querySelector('img').height / 2;
            marginImg = imgHeight * (newImageArr.length - 1) - (newImageArr.length -1 ) * marginTop;
        }

        img.setAttribute('style', `height: ${imgHeight}px; width: auto;margin-top: ${marginImg}px`);
        img.classList.add('innerChipImg');
    }

    getDOM () {
        return this.cellDOM;
    }

    getPosition () {
        return this.position;
    }

    getName () {
        return this.name;
    }

    undo () {
        const row = this.cellDOM.querySelector('.cell-chips-col-conainer');
        let currentCol = row.querySelector('.cell-chips-col-' + this.lastChipID);
        let currentColChipsInfo = currentCol.querySelector('.cell-chips-col-title');
        const currentColImages = currentCol.querySelectorAll('img');

        const currentColLength = currentColImages.length - 1;
        const lastChipImg = currentColImages[currentColLength] 
        currentCol.removeChild(lastChipImg);
        
        this.values[`btn_${this.lastChipID}`]--;
        
        currentColChipsInfo.textContent = this.values[`btn_${this.lastChipID}`];
    }

    clear () {
        const row = this.cellDOM.querySelector('.cell-chips-col-conainer');
        const cols = row.querySelectorAll('div[class^="cell-chips-col-"]');

        cols.forEach( currentCol => { 
            currentCol.querySelectorAll('img').forEach(img => img.remove());
            let currentChipsColTitle = currentCol.querySelector('.cell-chips-col-title');
            currentChipsColTitle.textContent = '';
        });
        
        this.values =  {
            btn_1: 0,
            btn_2: 0,
            btn_3: 0
        };
        
    }


    double () {
        const row = this.cellDOM.querySelector('.cell-chips-col-conainer');
        const cols = row.querySelectorAll('div[class^="cell-chips-col-"]');
        cols.forEach( (currentCol, index) => { 
            const chipID = index + 1;
            const currentColImages = currentCol.querySelectorAll('img');
            if (currentColImages) {
                currentColImages.forEach( () => {
                    this.onClick(chipID);
                });
                
            }
            
        });
    }

    updateChipsHistory () {
        // TODO remove magic numbers
        for (let i = 1; i < 4; i++ ) {
            this.valuesUpdates[`btn_${i}`].push(this.getScoreByChipID(i));
        }
    }

    removeLastPlayFromHistory () {
        // TODO remove magic numbers
        for (let i = 1; i < 4; i++ ) {
            this.valuesUpdates[`btn_${i}`].pop();
        }
    }

    getScoreByChipID (chipID) {
        return this.values[`btn_${chipID}`]
    }

	
}

export default Field;