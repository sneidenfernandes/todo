"use client";
import {useEffect, useState} from "react";
import ProgressBar from "./ProgressBar";

export default function List(){
    const [list, setList] = useState<Array<{text: string, completed: boolean}>>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [saved, setSaved] = useState<boolean>(false);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [percentageComplete, setPercentageComplete] = useState<number>(0);

    useEffect(()=>{
        const todos = String(localStorage.getItem("todos"));

        if(todos){
            const json = JSON.parse(todos);
            setList(json);
        } else {
            setList([]);
        }
    },[]);

    useEffect(()=>{

        let percentage : any = list.length === 0 ? 0 : (completedTasks/list.length).toFixed(2);        
        setPercentageComplete(percentage * 100);

        
    }, [list, completedTasks]);

    // todo operations
    const addTodo = () => {
        if(inputValue.trim() !== ""){
            const newTodo = {text: inputValue, completed: false}
            setList([...list, newTodo])
            
        }
        setInputValue("");

        
   
    }

    const removeTodo = (index: number, item: any) => {
               const newList = list.filter((_,i) => i !== index );
               setList(newList);
               if(item.completed){
                setCompletedTasks(completedTasks - 1)
               }

    }

    const toggleTodo = (index: number) => {
                
                const updatedList = list.map((todo,key)=>{
                     return index === key ? {...todo, completed:!todo.completed} : todo
                })
                setList(updatedList);


                const completedTaskList = updatedList.filter((todo)=>{
                    return todo.completed 
                })
                

                setCompletedTasks(completedTaskList.length)

               
                
    }

    const clearTodo = () => {
        setList([])
        setInputValue("");
        setPercentageComplete(0);
    }

    const save = () => {
        setSaved(true)
        const todoString = JSON.stringify(list);
        localStorage.setItem("todos", todoString)
        setTimeout(()=>{
            setSaved(false);
        },2000)
    }


    return <div>

            <div className="flex w-full justify-center flex-row">
                <ProgressBar completedTasks={String(percentageComplete)}/>
            </div>
        {/* Add task input */}
        <div>
            <input  value={inputValue} type="text" placeholder="Add Task" className="w-full font-mono p-4 focus:outline-none focus:border-transparent"
             onChange={(e)=>{
                setInputValue(e.target.value);
            }}
            
            onKeyDown={(e)=>{
                e.key === "Enter" ? addTodo() : ""
            }}
            />

        </div>
        
        {/* Todo List */}
        <div className="font-mono">
        {list.map((item,index)=> (
            <div key={index} className={`ml-3 flex flex-row justify-between my-2 ${item.completed ? `opacity-50` : ``}`}>
                <button onClick={()=> toggleTodo(index)} className="opacity-80">{item.completed ? "[x]" : "[ ]"}</button>

                <div className={`${item.completed ? `line-through`: ``} h-1 text-left flex`}>
                    {item.text}
                </div>
                
                <button onClick={()=>removeTodo(index, item)} >
                    {"[-]"}
                </button>
            </div>
        ))}    
        </div>  
        
        {/* <div>
            {percentageComplete}
        </div> */}
        
      
            {/* Buttons */}
        <div className={`${list.length === 0 ? `hidden` : ``} flex justify-evenly mt-4 opacity-50`}>

            

            {/* save button */}
            <button className="flex w-full justify-center flex-row mt-6" onClick={()=>save()}>
                {saved ? 'saving...': '[save]'}
            </button>

            {/* clear all button */}
            <button className="flex w-full justify-center  flex-row mt-6" onClick={()=> clearTodo()}>
                [clear all]
            </button>

            
        </div>


       


    </div>
}