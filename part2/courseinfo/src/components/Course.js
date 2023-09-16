const Header = ({ course }) => {
    return (
        <h2 key={course.id}>{course.name}</h2>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}


const Content = ({ course }) => {
    const parts = course.parts
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
            <h4>total of {total} exercises</h4>
        </div>

    )
}

const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => {
                return (
                    <div>
                        <Header course={course} />
                        <Content course={course} />
                    </div>)
            })}
        </div>




    )
}

export default Course