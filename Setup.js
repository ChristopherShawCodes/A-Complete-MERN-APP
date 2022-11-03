1. npx create-react-app client

    Navigate Public-->Index.html 

    Add Bootstrap:
    <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

    <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>


2. cd main folder 
3. Create Server Folder and server.js file
4. make sure you are in the Server Folder 
5. mkdir config controllers models routes
6. npm init -y 
7. npm i express mongoose cors

Folder Structure Setup Complete 
------------------------------------------------------------------------
8. Navigate to server.js File
9. Add Code:


const express = require('express')
const app = express() 
const port = 8000
const cors = require('cors')

require('./config/mongoose.config')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
    cors({
        origin: 'http://localhost:3000'
    }),
)


require('./routes/movie.routes')(app)


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})
------------------------------------------------------------------------
10. Create and setup mongoose.config.js 
11. Add Code:

const mongoose = require('mongoose')
db = 'nameOfDbHere'


mongoose.connect(`mongodb://localhost/${db}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log(`Connected to ${db}`)
}).catch((err) =>{
    console.log(`Unable to connect to ${db}`)
})

------------------------------------------------------------------------
12. Create and setup model.js file (Example: movie.model.js)
    -Create a schema/template to format the incoming data


    const mongoose = require('mongoose')


    const MovieSchema = new mongoose.Schema({
        title:{
            type: String
        },
        rating:{
            type: String
        },
        image:{
            type: String
        }
    })

    const Movie = mongoose.model('Movie', MovieSchema)

    module.exports = Movie
------------------------------------------------------------------------
13. Create and setup route.js file (Example: movie.routes.js)
14. Add Code:

    (connect to controller file)
    const MovieController = require('../controllers/movie.controllers.js')

    (create routes according to needs of the app)
  module.exports = (app) =>{
    //get all
    app.get('/api/allAuthors', AuthorController.getAll)
    //get one by id
    app.get('/api/author/:id', AuthorController.getOne)
    //Add one to db
    app.post('/api/addAuthor', AuthorController.addOne)
    //Update/Edit one
    app.put('/api/edit/:id', AuthorController.editOne)
    //Delete one
    app.delete('/api/delete/:id', AuthorController.deleteOne)
}

------------------------------------------------------------------------
15. Create and setup controller.js file (Example: movie.controllers.js)
16. Add Code: (this is a complete controller file for reference. some items will be covered as we progress)

   const Author = require('../models/author.model')
const authorRoutes = require('../routes/author.routes')

const getAll = (req,res) =>{
    Author.find()
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}

const getOne = (req,res) =>{
    Author.findById(req.params.id)
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}


const addOne = (req,res) =>{
    Author.create(req.body)
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
    })
}


const editOne = (req,res) =>{
    Author.updateOne({_id:req.params.id},req.body, {new:true, runValidators:true})
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}

const deleteOne = (req,res) =>{
    Author.deleteOne({_id:req.params.id})
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
})
}


module.exports = {
    getAll,
    getOne,
    addOne,
    editOne,
    deleteOne
}






------------------------------------------------------------------------

17. Navigate to Server.js
18. Import config file 
    require('./config/mongoose.config.js')
19. Import routes file and add (app)
    require('/routes/movie.routes.js')(app)
20. Run: nodemon server.js 

------------------------------------------------------------------------
Back-End Setup Complete 
------------------------------------------------------------------------
Front-End Setup
------------------------------------------------------------------------

21. Open a new terminal
22. cd client
23. npm i axios react-router-dom

24. Navigate to App.js
25. Add Code: 
    import {BrowserRouter,Routes,Route} from 'react-router-dom'

26. Import into the div 
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Form/>}/>
            </Routes>
        </BrowserRouter>
    </div>

------------------------------------------------------------------------
            FORM

27. Let's provide a way for the user to interact with the database. a FORM !
28. Create Components Folder
29. Create Form Components
30. Using the model created (movie.model.js) what inputs does our form need to have?
31. Be sure to match the model !
32. Make sure all of the form info is being passed to state
33. Add Code: 
    
    import React, {useState} from 'react'

    (within the const Form define state)
    const Form = ()=>{
        const [title, setTitle] = useState('')
        const [genre,setGenre] = useState('')
        const [director,setDirector] = useState('')
        etc.....(do this for all items. Match the model !)
    }

34. For each input provide an onChange event
35. Add Code: 

    (assign values to inputs to match DB)
    <input type='text' onChange={(e) => setTitle(e.target.value)} value={title}></input>
--------------------------------------------------------------------------

36. Navigate to App.js
37. Import the FORM and the ROUTE

    import Form from './components/Form'
    <Route path='/' element={<Form/>}/>

--------------------------------------------------------------------------

38. Start Server
39. cd client
40. npm start 
--------------------------------------------------------------------------
                    Storing Data Into The Database

41. Navigate to Form.js
42. import axios from 'axios'
43. Create and implement handleSubmit

    const handleSubmit =(e) =>{
        e.preventDefault()
        //(after post insert the route that creates a new object on submit)
        axios.post('http://localhost:8000/api/addMovie',{
            title,
            director,
            rating,
            genre
        }).then((res)=>{
            console.log(res)
        }).catch((err) =>{
            console.log(err)
        })
    }


    From here you can confirm the database exists with MongoDB Compass
    Should also be able to add an entry with the form and confirm with Compass
------------------------------------------------------------------------------
                    Displaying data from the database 
 
44. Create another Component to display all objects (Example: MovieList or allMovies)
45. Add Code: 

    import React,{useState,useEffect} from 'react'
    import axios from 'axios'

46. We will make a request using Axios to our server to get all movies in the DB, this request will
    be placed in a useEffect w/an empty array so it only runs once on initial load then we will
    store the movies in state.

47. Add Code:

    const MovieList = () =>{
        const [list,setList] = useState([])

        useEffect(() =>{
        axios.get('http://localhost:8000/api/allMovies')
        .then((res) =>{
        console.log(res)
        setList(res.data)
        }).catch(err => console.log(err))
    },[])

    //in the return we will list through the objects and label each one, here we are calling it 'movie'


    return(
        <div>
        {
            list.map((movie) =>{
                <div>
                <img src={movie.boxArt}/>
                <p>{movie.title}</p>
                <p>{movie.genre}</p>
                <p>{movie.director}</p>
                <p>{movie.description}</p>
                </div>
            })
        }
        </div>
    )

4. Navigate to App.js 
5. Create a new route to DISPLAY ALL

    import {link} from 'react-router-dom'

    <Route path='/allMovies' element={<DisplayAll/>}/>
------------------------------------------------------------------------------

                Branching To Update & Delete 


To update we want to click on an item and be directed to that page rendering one object.
This will be our start to EDIT the page/component.

1. Create COMPONENT to show one (Example: oneMovie.js , oneProduct.js)
    //basically blank at this point just rafce 

2. Navigate back to the show all page
3. On the show all page, we want to add a button or link to navigate from show all to show one
    
    import {link} from 'react-router-dom'

    <Link to={`/oneMovie/${movie._id}`} className='badge rounded-pill text-warning' id='link'>More Info</Link>


4. Navigate to App.js 
5. Create a new route to show one

    <Route path='/oneMovie/:id' element={<OneMovie/>}

6. The :id allows us to use PARAMS to access the specific ID of the ONE movie we want 
7. Add the ROUTE to the BUTTON  in Show ALL / Display ALl

    <button className='btn btn-primary'><Link to=`/oneMovie/${movie._id}`></Link></button>

8. Note we need to access {movie._id}

9. Check to make sure link works correctly

10. BACK on SHOW ONE / DISPLAY ONE Deconstruct the ID out of USE PARAMS

    import {useParams,useNavigate,Link} from 'react-router-dom'

    const {id} = useParams()

11. Setup STATE 

    import React,{useState,useEffect} from 'react'

    const [movie,setMovie] = useState({})

12. Setup AXIOS request

    import axios from 'axios'

    const navigate = useNavigate()

        useEffect(() =>{
        //Server --> Routes --> Get One Movie
        axios.get(`http://localhost:8000/api/movie/${id}`)
        .then((res)=>{
            //storing to State
            setMovie(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

13. Pass data to HTML to render 

     <div className='card' id='oneCard'>
        <div className='card-header'>
            {author.name}
        </div>
        <div className='card-body'>
            <Link to={`/edit/${author._id}`} id='editLink'>Edit Movie</Link>
      </div>



We can now render a SHOW ONE let's delete it.

Having issues at this point? Check your routes ! 
Does your axios routes match where you need to go ?

Compare to the Server-->Routes File 

------------------------------------------------------------------------------
------------------------------------------------------------------------------

                DELETE 


1. Still on the SHOW ONE , in this case OneMovie.js 

2. Create a DELETE BUTTON
3. Pass the ID to the onClick so it's available to the function when it runs

        <button onClick={(e)=> handleDelete(movie._id)} className='btn btn-outline-danger' id='delete'>Delete Movie</button>

        const handleDelete = (id) =>{
        //Server --> Routes --> Delete Movie
        axios.delete(`http://localhost:8000/api/delete/${id}`)
        .then((res)=>{
            navigate('/movielist')
            console.log(`Deleted ${movie.title} from DB`)
        }).catch((err)=>{
            console.log(`Unable to delete ${movie.title}`)
            console.log(err)
        })
    }

4. EASY BUTTON 

------------------------------------------------------------------------------

                UPDATE 

Its the ugh in crud. 

1. Create an EDIT FORM COMPONENT (Example: editForm.js)

    basically blank for now just rafce or copy all of Form.js and paste it (few changes will be needed )

2. Navigate to App.js & CREATE the EDIT ROUTE 

    <Route path='/edit/:id' element={<EditForm/>}/>

3. Navigate back to the EDIT FORM (editForm.js)
4. rafce
5. From here reference your original FORM. 
6. Bring in your imports 

    import axios from 'axios'
    import React,{useState,useEffect} from 'react'
    import { useNavigate,useParams } from 'react-router-dom'


7. Destructure ID out of useParams 

    const {id} = useParams()

8. Create useEffect , passing in data to be rendered on the EDIT form 

        useEffect(() =>{
        axios.get(`http://localhost:8000/api/movie/${id}`)
        .then((res) =>{
            setTitle(res.data.title)
            setDirector(res.data.director)
            setRating(res.data.rating)
            setGenre(res.data.genre)
            setReleaseYear(res.data.releaseYear)
            setDuration(res.data.duration)
            setBoxArt(res.data.boxArt)
        }).catch((err)=>{
            console.log(`Unable To Edit ${id}`)
            console.log(err)
        })
    },[])


9. Bring over: (basically everything if you haven't already but note the differences above )

    -STATE
    -useEffect/Axios request
    -handleSubmit function
    -form or entire return statement

    A Completed EDIT PAGE IS BELOW (Below Show One Reference)
------------------------------------------------------------------------------
                A Completed SHOW ONE Reference


import React,{useState,useEffect} from 'react'
import axios from 'axios'
//import useParams so we have access to the id 
import {useParams,useNavigate,Link} from 'react-router-dom'

const OneMovie = () => {
    //destruct out of useParams the specific parameter(id)
    const {id} = useParams()
    const navigate = useNavigate()
    const [movie,setMovie] = useState({})



    useEffect(() =>{
        //Server --> Routes --> Get One Movie
        axios.get(`http://localhost:8000/api/movie/${id}`)
        .then((res)=>{
            setMovie(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const handleDelete = (id) =>{
        //Server --> Routes --> Delete Movie
        axios.delete(`http://localhost:8000/api/delete/${id}`)
        .then((res)=>{
            navigate('/movielist')
            console.log(`Deleted ${movie.title} from DB`)
        }).catch((err)=>{
            console.log(`Unable to delete ${movie.title}`)
            console.log(err)
        })
    }


  return (
    <div className='row' id='oneMain'>
    <div class="card" id='oneMovie'>
    <div class="card-header" id='oneNav'>
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link active bg-dark" aria-current="page" href="#">{movie.title}</a>
        </li>
        <li class="nav-item">
        <Link className='nav-link' to={`/edit/${movie._id}`}>Edit Movie</Link>
        </li>
        <li class="nav-item">
                <a><button onClick={(e)=> handleDelete(movie._id)} className='nav-link text-danger'>Delete Movie</button></a>
        </li>
      </ul>
    </div>
    <div class="card-body" id='oneMovieBody'>
                <img className='col-4' src={movie.boxArt} alt='Image link broken or missing entirely' id='oneImage'/>
                <div id='oneMovieText'>
                    <p class="card-text">Genre: {movie.genre}</p>
                    <p class="card-text">Rating: {movie.rating}</p>
                    <p class="card-text">Director: {movie.director}</p>
                    <p class="card-text">Duration: {movie.duration}</p>
                    <p class="card-text">Release Year: {movie.releaseYear}</p>
                </div>
    </div>
  </div>
  </div>   
  )
}

export default OneMovie

----------------------------------------------------

                Completed EDIT Page 

import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'


const EditForm = () => {
    const [title,setTitle] = useState('')
    const [director,setDirector] = useState('')
    const [rating,setRating] = useState('')
    const [genre,setGenre] = useState('')
    const [releaseYear,setReleaseYear] = useState('')
    const [duration,setDuration] = useState('')
    const [boxArt,setBoxArt] = useState('')
    const [errors, setErrors] =useState({})

    const {id} = useParams()

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/movie/${id}`)
        .then((res) =>{
            setTitle(res.data.title)
            setDirector(res.data.director)
            setRating(res.data.rating)
            setGenre(res.data.genre)
            setReleaseYear(res.data.releaseYear)
            setDuration(res.data.duration)
            setBoxArt(res.data.boxArt)
        }).catch((err)=>{
            console.log(`Unable To Edit ${id}`)
            console.log(err)
        })
    },[])
    

const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault()
    //Server --> Routes --> Update Movie
    axios.put(`http://localhost:8000/api/update/${id}`,{
        title,
        director,
        rating,
        genre,
        releaseYear,
        duration,
        boxArt
    }).then((res) =>{
        console.log(res)
        // navigate('/movielist')
        navigate(`/oneMovie/${id}`)
    }).catch((err)=>{
        setErrors(err.response.data.errors)
        console.log(err)
    })
}

    return (
    <div className='row' id='main'>
    <div className='col-6 mx-auto mt-5'>
        <form className='form-control bg-dark text-light ' onSubmit={handleSubmit} id='formContainer'>
        <h4 id='formHead'>{title}</h4>
            <label className='form-label'>Title:</label>
                <input className='form-control' type='text' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <label className='form-label'>Director:</label>
                <input className='form-control' type='text' onChange={(e)=>setDirector(e.target.value)} value={director}></input>
            <label className='form-label'>Rating:</label>
            <select className='form-control' onChange={(e) =>setRating(e.target.value)} value={rating}>
                <option>Select A Rating</option>
                <option value='G'>G</option>
                <option value='PG'>PG</option>
                <option value='PG-13'>PG-13</option>
                <option value='R'>R</option>
                <option value='NC-17'>NC-17</option>
            </select>
            <label className='form-label'>Genre:</label>
            <select className='form-control' onChange={(e) =>setGenre(e.target.value)} value={genre}>
                <option>Select A Genre</option>
                <option value='Comedy'>Comedy</option>
                <option value='Drama'>Drama</option>
                <option value='Horror'>Horror</option>
                <option value='Sci-Fi'>Sci-Fi</option>
                <option value='Fantasy'>Fantasy</option>
                <option value='Action'>Action</option>
                <option value='Family'>Family</option>
                <option value='Animated'>Animated</option>
                <option value='Documentary'>Documentary</option>
                <option value='Thriller'>Thriller</option>
                <option value='Anime'>Anime</option>
            </select>
            <label className='form-label'>Release Year:</label>
                <input className='form-control' type='number' onChange={(e)=>setReleaseYear(e.target.value)} value={releaseYear}></input>
            <label className='form-label'>Duration:</label>
                <input className='form-control' placeholder='0hr 00min' type='text' onChange={(e)=>setDuration(e.target.value)} value={duration}></input>
            <label className='form-label'>Image:</label>
                <input className='form-control' type='text' onChange={(e)=>setBoxArt(e.target.value)} value={boxArt}></input>
            <button className='btn btn-primary mt-3 mb-3' type='submit'>Edit Movie</button>
        </form>
    </div>
    <div className='col-4' id='rightAdd'>
    <ul>
    <li>{errors.title ? <span className='text-danger' id='validationError'>{errors.title.message}</span> : null}</li>
    <li>{errors.director ? <span className='text-danger' id='validationError'>{errors.director.message}</span> : null}</li>
    <li>{errors.rating ? <span className='text-danger' id='validationError'>{errors.rating.message}</span> : null}</li>
    <li>{errors.genre ? <span className='text-danger' id='validationError'>{errors.genre.message}</span> : null}</li>
    <li>{errors.releaseYear ? <span className='text-danger' id='validationError'>{errors.releaseYear.message}</span> : null}</li>
    <li>{errors.duration ? <span className='text-danger' id='validationError'>{errors.duration.message}</span> : null}</li>
    <li>{errors.boxArt ? <span className='text-danger' id='validationError'>{errors.boxArt.message}</span> : null}</li>
    </ul> 
        </div>
        <div className='col-2'>
        <h1 id='addingText'>Editing A Movie.</h1>
        </div>
    </div>
)
}

export default EditForm    


Stuck ? Again check your routes also check your target values for whatever you are passing through 

I got stuck on this one for a few mins 
Example: 
useEffect(() =>{
        axios.get(`http://localhost:8000/api/movie/${id}`)
        .then((res) =>{
            setTitle(res.data.title) <-- make sure these match but also make sure you are using a title . Mine was name instead of title .....
            setDirector(res.data.director)
            setRating(res.data.rating)
            setGenre(res.data.genre)
            setReleaseYear(res.data.releaseYear)
            setDuration(res.data.duration)
            setBoxArt(res.data.boxArt)
        }).catch((err)=>{
            console.log(`Unable To Edit ${id}`)
            console.log(err)
        })
    },[])

---------------------------------------------------------------------------------

                        Validations

    //MODEL Validations

1. Navigate to Server Folder --> Models (Example: movie.models.js)
2. Add validations under the Model new mongoose.Schema

    const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,'Title is required.'],
        minLength: [2,'Title must be longer than 2 characters'],
        maxLength: [30, 'Title can be no longer than 30 characters']
    }

3. Please NOTE validation for INT/ Year field is different. 

     releaseYear:{
        type: Number,
        required:[true,'Release Year is required.'],
        max: [2023, "Release Year can't be in the future."],
        min: [1895, "The first movie was made in 1895"]
    }

    //Controller Validations 

4. Navigate to Server Folder --> Controllers (Example: movie.controllers.js)
5. Add this validation to every BACK-END controller function

    const addMovie = (req,res) =>{
    Movie.create(req.body)
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
 -->       res.status(400).json(err)     <-- *THIS LINE IS NEW*
    })
    }

6. In the same file we need to add an EXTRA validation / Pass an option object to the UPDATE METHOD
    By default mongoose doesn't run validations on an update/put request so we must add this !

    const updateMovie = (req,res) =>{                  *BELOW IS NEW*
    Movie.updateOne({_id:req.params.id},req.body, {new:true, runValidators:true})
    .then((result) =>{
        res.json(result)
    }).catch((err)=>{
        res.status(400).json(err)
    })
    }

7. Now we will set up showing these errors to the user
8. Navigate to Client --> Components --> Form.js 
9. Store the errors in state 
    const [errors,setErrors] = useState({})

10. Now set the error under the HANDLE SUBMIT FUNCTION 

    const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/addMovie',{
        title,
        director,
        rating,
        genre,
        releaseYear,
        duration,
        boxArt
    }).then((res) =>{
        console.log(res)
        navigate('/movielist')
    }).catch((err)=>{
        console.log(err)
        setErrors(err.response.data.errors)
    })
}

11. Now that it is in STATE let's display it to the user
12. Down in the HTML Add

    <li>{errors.title ? <span className='text-danger' id='validationError'>{errors.title.message}</span> : null}</li>

13. Add one of these for each FORM INPUT being sure to match the MODEL !
14. Navigate to Edit.js (or the page where you are rendering your item to edit)
15. Repeat steps 8-13 


--------------------------------------------------------------------------------------

            A completed FORM.js file for reference 

    import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Form = () => {

    const [title,setTitle] = useState('')
    const [director,setDirector] = useState('')
    const [rating,setRating] = useState('')
    const [genre,setGenre] = useState('')
    const [releaseYear,setReleaseYear] = useState('')
    const [duration,setDuration] = useState('')
    const [boxArt,setBoxArt] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/addMovie',{
        title,
        director,
        rating,
        genre,
        releaseYear,
        duration,
        boxArt
    }).then((res) =>{
        console.log(res)
        navigate('/movielist')
    }).catch((err)=>{
        console.log(err)
        setErrors(err.response.data.errors)
    })
}


    return (
    <div className='row' id='main'>
    <div className='col-6 mx-auto mt-5'>
        <form className='form-control bg-dark text-light' onSubmit={handleSubmit} id='formContainer'>
        <h4 id='formHead'>{title}</h4>
            <label className='form-label'>Title:</label>
                <input className='form-control' placeholder="Movie Title" type='text' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <label className='form-label'>Director:</label>
                <input className='form-control' placeholder="Director's Name" type='text' onChange={(e)=>setDirector(e.target.value)} value={director}></input>
            <label className='form-label'>Rating:</label>
            <select className='form-control' onChange={(e) =>setRating(e.target.value)} value={rating}>
                <option>Select A Rating</option>
                <option value='G'>G</option>
                <option value='PG'>PG</option>
                <option value='PG-13'>PG-13</option>
                <option value='R'>R</option>
                <option value='NC-17'>NC-17</option>
            </select>
            <label className='form-label'>Genre:</label>
            <select className='form-control' onChange={(e) =>setGenre(e.target.value)} value={genre}>
                <option>Select A Genre</option>
                <option value='Comedy'>Comedy</option>
                <option value='Drama'>Drama</option>
                <option value='Horror'>Horror</option>
                <option value='Sci-Fi'>Sci-Fi</option>
                <option value='Fantasy'>Fantasy</option>
                <option value='Action'>Action</option>
                <option value='Family'>Family</option>
                <option value='Animated'>Animated</option>
                <option value='Documentary'>Documentary</option>
                <option value='Thriller'>Thriller</option>
                <option value='Anime'>Anime</option>
            </select>
            <label className='form-label'>Release Year:</label>
                <input className='form-control' placeholder='YYYY' type='number' onChange={(e)=>setReleaseYear(e.target.value)} value={releaseYear}></input>
            <label className='form-label'>Duration:</label>
                <input className='form-control' placeholder='0hr 00min' type='text' onChange={(e)=>setDuration(e.target.value)} value={duration}></input>
            <label className='form-label'>Image:</label>
                <input className='form-control' placeholder='copy & paste image address here' type='text' onChange={(e)=>setBoxArt(e.target.value)} value={boxArt}></input>
            <button className='btn btn-primary mt-3 mb-3' type='submit'>Add Movie To Database</button>
        </form>
    </div>
    <div className='col-4' id='rightAdd'>
    <ul>
    <li>{errors.title ? <span className='text-danger' id='validationError'>{errors.title.message}</span> : null}</li>
    <li>{errors.director ? <span className='text-danger' id='validationError'>{errors.director.message}</span> : null}</li>
    <li>{errors.rating ? <span className='text-danger' id='validationError'>{errors.rating.message}</span> : null}</li>
    <li>{errors.genre ? <span className='text-danger' id='validationError'>{errors.genre.message}</span> : null}</li>
    <li>{errors.releaseYear ? <span className='text-danger' id='validationError'>{errors.releaseYear.message}</span> : null}</li>
    <li>{errors.duration ? <span className='text-danger' id='validationError'>{errors.duration.message}</span> : null}</li>
    <li>{errors.boxArt ? <span className='text-danger' id='validationError'>{errors.boxArt.message}</span> : null}</li>
    </ul> 
        </div>
        <div className='col-2'>
        <h1 id='addingText'>Adding A Movie.</h1>
        </div>
    </div>
)
}

export default Form

----------------------------------------------------------------------------------------

That's it ! Double check your work. Use console.logs to find issues. 

CHECK YOUR ROUTES !!!







