import React, { useState } from 'react'
import './styles/Card.css';
import button_img from '../Images/icon-arrow.svg'

const Card = () => {
    const [calenderData, setCalenderData] = useState({
        day: null,
        month: null,
        year: null
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [err, setErr] = useState(false);
    function findAge(currentDate, currentMonth, currentYear, birthDate, birthMonth, birthYear) {
        const monthsArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (birthDate > currentDate) {
            currentDate = currentDate + monthsArr[birthMonth - 1];
            currentMonth = currentMonth - 1;
        }

        if (birthMonth > currentMonth) {
            currentYear = currentYear - 1;
            currentMonth = currentMonth + 12;
        }

        const calculatedDate = currentDate - birthDate;
        const calculatedMonth = currentMonth - birthMonth;
        const calculatedYear = currentYear - birthYear;
    
        return [calculatedDate, calculatedMonth, calculatedYear]
    }
    function changeHandler(e){
        setCalenderData({
            ...calenderData,
            [e.target.name] : e.target.value
        })
        if(e.target.value === ''){
            setErr(true);
        }
        else if(e.target.name === 'day' && ((e.target.value > 31 || e.target.value > mArr[calenderData.month-1]) || (e.target.value < 0))){
            setErr(true);
        }
        else if(e.target.name === 'month' && (e.target.value > 12 || e.target.value < 0)){
            setErr(true);
        }
        else if(e.target.name === 'year' && (e.target.value > pres.getFullYear())){
            setErr(true);
        }
        else{
            setErr(false);
        }
    }
    function ageCalculator(){
        if((calenderData.day === '' || calenderData.day === null) || (calenderData.month === '' || calenderData.month === null) || (
            calenderData.year === '' || calenderData.year === null
        )){
            setErr(true);
           setErrorMessage("This field is required!")
        }
        else{
            setErrorMessage('');
            setErr(false);
        }
        const curr = new Date();
        const [d, m, y] = findAge(curr.getDate(), curr.getMonth()+1, curr.getFullYear(), calenderData.day, calenderData.month, calenderData.year)
        setCurrentAge({
            currDay: d,
            currMonth: m,
            currYear:y
        })
    }
    const [currentAge, setCurrentAge] = useState({
        currDay: "--",
        currMonth: "--",
        currYear: "--"
    })
    const mArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const pres = new Date();
  return (
    <div className='card'>

        <div>
        <div className='w-inp'>
            <div className='inp'>
                <label htmlFor="day" className={err ? 'error':''}>DAY</label>
                <input type="number" name="day" id="day" value={calenderData.day} placeholder='DD' className={err ? 'error':''} onChange={changeHandler}/>
                {
                    calenderData.day === '' && <p className='error  error-line'>This field is required</p>
                }
                {
                ((calenderData.day > 31 || calenderData.day > mArr[calenderData.month-1]) || (calenderData.day < 0)) && 
                <p className='error error-line'>Must be a valid day</p>
                }
                <p className='error  error-line'>{errorMessage}</p>
            </div>
            <div className='inp'>
                <label htmlFor="month" className={err ? 'error':''}>MONTH</label>
                <input type="number" name="month" id="month" value={calenderData.month} placeholder='MM' className={err ? 'error':''} onChange={changeHandler}/>
                {
                    calenderData.month === '' && <p className='error  error-line'>This field is required</p>
                }
                {
                    (calenderData.month > 12 || calenderData.month < 0) && <p className='error  error-line'>Must be a valid month</p>
                }
                <p className='error  error-line'>{errorMessage}</p>
            </div>
            <div className='inp'>
                <label htmlFor="year" className={err ? 'error':''}>YEAR</label>
                <input type="number" name="year" id="year" value={calenderData.year} placeholder='YYYY' className={err ? 'error':''} onChange={changeHandler}/>
                {
                    calenderData.year === '' && <p className='error  error-line'>This field is required</p>
                }
                {
                    calenderData.year > pres.getFullYear() && <p className='error  error-line'>Must be in the past</p>
                }
                <p className='error  error-line'>{errorMessage}</p>
            </div>
            </div>
            
            
            
        </div>
        <div className='line-btn'>
            <div className='line'></div>
            <button onClick={ageCalculator}><img src={button_img} alt="" /></button>
        </div>
        <div className='output-box'>
            <h1 className='output'><span>{currentAge.currYear}</span> Years</h1> 
            <h1 className='output'><span>{currentAge.currMonth}</span> Months</h1> 
            <h1 className='output'><span>{currentAge.currDay}</span> Days</h1> 
        </div>
        </div>

  )
}

export default Card
