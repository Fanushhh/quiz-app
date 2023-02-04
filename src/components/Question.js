import React from "react";



export default function Question(props){
    // TODO : lookup how to randomply generate the answers as right now the correct answer is on the first row of answers
    return (
    <form onSubmit={props.onFormSubmit}>
        <h1>{props.data.question}</h1>
        {props.data.answers.map((answer, index) => (
            <div key={index} className={props.isChecked === answer ? 'clicked' : '' }>
                <input 
                onChange={props.handleChange} 
                value={answer} 
                type='radio' 
                id={`answer-${index}`} 
                name='answer-group'
                checked={props.isChecked === answer} 
                />
                <label 
                htmlFor={`answer-${index}`}
                >{answer}
                </label>
            </div>
            )
        )}
        <button type='submit' disabled={props.isChecked === ''}>Submit</button>
    </form>
    
    )
}