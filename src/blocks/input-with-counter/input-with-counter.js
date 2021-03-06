import inputInit from "../text-field/_with/text-field_with_arrow-down/text-field_with_arrow-down.js"

function initInputWithCounter(values, container){
    const area = container || document
    area.querySelectorAll(".js-input-with-counter").forEach((block, index)=>{
        let value
        if(values) value = values[index]
        let input = block.querySelector('input');
        let list = block.querySelector('.js-input-with-counter__menu');
        let listEl = list.querySelectorAll('li');
        let clearingButton = block.querySelector('.js-input-with-counter__button_delete')
        let confirmingButton = block.querySelector('.js-input-with-counter__button_confirm')

                    
        inputInit()
        input.addEventListener('focus', rollDownMenu)
        clearingButton.addEventListener('click', handlerDeleteButtonClick)
        clearingButton.addEventListener('keydown', handlerDeleteButtonClick)
        confirmingButton.addEventListener('click', handlerConfirmButtonClick) 
        confirmingButton.addEventListener('keydown', handlerConfirmButtonClick) 

        let valuesAreNotZero = 0
        listEl.forEach((liElement, index)=>{
            let counter = liElement.querySelector('.js-input-with-counter__counter')
            let number = counter.querySelector(".js-input-with-counter__number")
            let min = +(counter.getAttribute('data-min') );
            let max = +(counter.getAttribute('data-max') );
            let tumblerPlus = counter.lastChild
            let tumblerMinus = counter.firstChild

            initItem()
            valuesAreNotZero += +number.textContent

            ///////
            function initItem(){
                if(value && value[index]){
                    number.textContent = Math.max(min,Math.min(value[index], max))
                }
                
                if (+number.textContent == min){
                    tumblerMinus.classList.add("input-with-counter__tumbler_depricated")
                };

                if (+number.textContent == max){
                    tumblerPlus.classList.add("input-with-counter__tumbler_depricated")
                }
                
                tumblerMinus.addEventListener('click', handlerMinusClick)
                tumblerMinus.addEventListener('keydown', handlerMinusClick)
                tumblerPlus.addEventListener('click', handlerPlusClick)
                tumblerPlus.addEventListener('keydown', handlerPlusClick)
                tumblerMinus.tabIndex = 0;
                tumblerPlus.tabIndex = 0;
            }

            function handlerMinusClick(e){
                if(e.type == 'keydown' && e.code !== "Enter") return
                //Не знаю, не возбраняется ли, что я функцию с таким названием и на обработку для нажатия клавиши впихнул
                //показалось удобным, ведь обработки абсолютно идентичны
                let newValue = Math.max(+number.textContent-1, min)
                number.textContent = newValue
                if (newValue == min){
                    tumblerMinus.classList.add("input-with-counter__tumbler_depricated");
                    valuesAreNotZero = 0
                    listEl.forEach(el=>{
                        valuesAreNotZero +=(+el.querySelector('.js-input-with-counter__number').textContent)
                    
                    })
                    if (!valuesAreNotZero)clearingButton.classList.remove("input-with-counter__button_visible-delete")
                };
                if(newValue!==max){
                    tumblerPlus.classList.remove("input-with-counter__tumbler_depricated");
                }
            }
            
            function handlerPlusClick(e){
                if(e.type == 'keydown' && e.code !== "Enter") return
                let newValue = Math.min(+number.textContent+1, max)
                number.textContent = newValue;
                if (newValue == max){
                    tumblerPlus.classList.add("input-with-counter__tumbler_depricated")
                };
                if(newValue!==min){
                    tumblerMinus.classList.remove("input-with-counter__tumbler_depricated")
                    clearingButton.classList.add("input-with-counter__button_visible-delete")
                }
            }
        })

        if(value) confirment();
        if(valuesAreNotZero) clearingButton.classList.add("input-with-counter__button_visible-delete")
        
        //////
        function rollDownMenu(){
            input.classList.add("text-field_with_arrow-down__value_active")
            list.classList.remove("input-with-counter__menu_hidden")
            document.addEventListener("click", rollUpMenu)
            document.addEventListener("focusin", rollUpMenu)
        };

        function rollUpMenu(event){
            if(!block.contains(event.target) ){
                confirment();
                list.classList.add("input-with-counter__menu_hidden")
                document.removeEventListener("click", rollUpMenu)
                document.removeEventListener("focusin", rollUpMenu)
                input.classList.remove("text-field_with_arrow-down__value_active")
            }

        };

        function handlerConfirmButtonClick(e){
            if(e.type == 'keydown' && e.code !== "Enter") return
            confirment()
            list.classList.add("input-with-counter__menu_hidden")
        }

        function handlerDeleteButtonClick(e){
            if(e.type == 'keydown' && e.code !== "Enter") return
            listEl.forEach(item=>{
                let min = +item.querySelector('.js-input-with-counter__counter').getAttribute('data-min')
                let max = +item.querySelector('.js-input-with-counter__counter').getAttribute('data-max')
                item.querySelector('.input-with-counter__number').textContent = `${min}`;

                let tumblerMinus = item.querySelector('.js-input-with-counter__counter').firstChild;
                let tumblerPlus = item.querySelector('.js-input-with-counter__counter').lastChild;
                clearingButton.classList.remove("input-with-counter__button_visible-delete")
                tumblerMinus.classList.add("input-with-counter__tumbler_depricated")

                if(min !== max){
                    tumblerPlus.classList.remove("input-with-counter__tumbler_depricated")
                }

                input.value = ''
            })
        }
        function confirment(){
            let stringForValue = ''
            if(block.classList.contains("input-with-counter_simple")){
                listEl.forEach( (it,i) =>{concatForSimplified(it,i)})
            }

            else{
                listEl.forEach( (it,i) =>{concatForStandart(it,i)})
            }

            stringForValue = stringForValue || input.getAttribute("placeholder")
            input.value = stringForValue

            ///
            function concatForSimplified(element, index){
                let number = +element.querySelector(".js-input-with-counter__number").textContent

                if(index==0){
                    let formsOfWord = ["спальня", "спальни", "спалень"] //Это стоило сделать переменной, но пусть пока так 
                
                    stringForValue  += number;
                    if(number == 1 || number%10 == 1) stringForValue += (" " + formsOfWord[0]);
                    else if(5>number || 5>(number%10)) stringForValue +=(" " + formsOfWord[1]);
                    else stringForValue += (" " + formsOfWord[2]);
                }
                else if(index==1){
                    let formsOfWord = ["кровать", "кровати", "кроватей"]
                    if(number == 1 || number%10 == 1) stringForValue += (", " + number + " " + formsOfWord[0]);
                    else if(5>number || 5>(number%10)) stringForValue +=(", " + number + " " + formsOfWord[1]);
                    else stringForValue += (", " + number + " " + formsOfWord[2]);
                }
                else if(index==2){
                    number == 0 ?
                        stringForValue += ''
                        :
                        stringForValue += '...'
                }
            }

            function concatForStandart(element, index){
                let number= +element.querySelector(".js-input-with-counter__number").textContent

                if(index==0){
                    stringForValue=+stringForValue + number; 
                }
                else if(index==1){
                    let formsOfWord = ["гость", "гостя", "гоcтей"]
                    stringForValue = +stringForValue + number;
                    if (stringForValue==0){stringForValue=''}
                    else if(stringForValue == 1 || stringForValue%10 == 1) stringForValue += (" " + formsOfWord[0]);
                    else if(5>stringForValue || 5>(stringForValue%10)) stringForValue +=(" " + formsOfWord[1]);
                    else stringForValue += (" " + formsOfWord[2]);
                }
                else if(index== 2){
                    let formsOfWord = ["младенец", "младенца", "младенцев"]
                    let string = ""
                    if (number==0) return
                    else if(number == 1 || number % 10 == 1) string += (" " + formsOfWord[0]);
                    else if(5>number || 5>number%10) string += (" " + formsOfWord[1]);
                    else string += " " + formsOfWord[2];
                    if(stringForValue && string) stringForValue += (", " + number + string)
                    
                }
            }
        }
    })
}
export default initInputWithCounter