
interface progresBarInputs {
    completedTasks : string
}

export default function ProgressBar({completedTasks}:progresBarInputs){

    const percentage = parseFloat(completedTasks)

    return (

    <div className="w-full bg-gray-300 rounded h-[1px] my-4">
        <div className={`bg-gray-500 h-[1px] rounded`} style={{ width: `${percentage}%` }} ></div>
    </div>


    )
}


// ${[percentage]}