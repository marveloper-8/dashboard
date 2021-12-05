import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePerson, deletePerson, setPerson } from "../redux/action";
import * as STYLE from '../styles/general'
import Swal from "sweetalert2";
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

const Home = () => {
    const [section, setSection] = useState("data");
    const [loading, setLoading] = useState(true);
    const [editValue, setEditValue] = useState()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [city, setCity] = useState("")
    const [sortToggle, setSortToggle] = useState(false)
    const sortValue = sortToggle ? "username" : "-username"

    const dispatch = useDispatch();

    const list = useSelector((state: any) => state);

    const tableHead = [
        "Id",
        "Name",
        "Username",
        "Email",
        "City",
        "Edit",
        "Delete"
    ]

    const values = [
        {
            label: "Name",
            value: name,
            onChange: (e: any) => setName(e.target.value),
            required: true,
            type: "name"
        },
        {
            label: "Email",
            value: email,
            onChange: (e: any) => setEmail(e.target.value),
            required: true,
            type: "email"
        },
        {
            label: "Username",
            value: username,
            onChange: (e: any) => setUsername(e.target.value),
            required: true,
            type: "username"
        },
        {
            label: "City",
            value: city,
            onChange: (e: any) => setCity(e.target.value),
            required: true,
            type: "city"
        },
    ]

    const submit = () => {
        dispatch(setPerson({
            id: list[list.length - 1].id + 1,
            name: name,
            username: username,
            email: email,
            address: {
                city: city
            }
        }));
        setSection("data");
        setName("")
        setEmail("")
        setUsername("")
        setCity("")
    }

    const editFunction = (e: any) => {
        setEditValue(e.id)
        setSection("edit")
        setName(e.name)
        setEmail(e.email)
        setUsername(e.username)
        setCity(e.address.city)
    }

    const submitUpdate = () => {
        dispatch(updatePerson(
            {
                id: editValue,
                name: name,
                email: email,
                username: username
            }
        ))
        setSection("data");
    }

    const deleteFunction = (e: any) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })
        
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'This record has been deleted.',
                    'success'
                )
                dispatch(deletePerson(e))
            } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your record is safe :)',
                'error'
            )
            }
        })
    }

    const cancel = () => {
        setSection("data");
        setName("")
        setEmail("")
        setUsername("")
        setCity("")
    }

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`)
      .then((res) => res.json())
      .then((result) => {
          setLoading(false);
        dispatch(setPerson(result));
      });
  }, [dispatch]);

  function dynamicSort(property: any) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a: any, b: any) {
        if(sortOrder === -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

  console.log(list.sort(dynamicSort("username")))


  return (
    <STYLE.Container>
        <h1>Dashboard</h1>
        {section === "new" ? (
            <STYLE.TableWrapper>
                <STYLE.TableWrapperHead>
                    <h2>Form</h2>
                </STYLE.TableWrapperHead>
                <STYLE.Form>
                    {values.map((item: any) => {
                        return (
                            <STYLE.InputContainer>
                                <div>{item.label}</div>
                                <input 
                                    type={item.type} 
                                    value={item.value}
                                    onChange={item.onChange}
                                    style={{
                                        padding: '10px 20px'
                                    }}
                                />
                            </STYLE.InputContainer>
                        )
                    })}
                    <STYLE.ButtonContainer>
                        <span style={{marginRight: '10px'}}>
                            <STYLE.Button 
                                type="danger" 
                                onClick={() => cancel()}
                            >Cancel</STYLE.Button>
                        </span>
                        <STYLE.Button 
                            type="success"
                            onClick={() => submit()}
                        >Submit</STYLE.Button>
                    </STYLE.ButtonContainer>
                </STYLE.Form>
            </STYLE.TableWrapper>
        ) : section === "edit" ? (
            <>
                {list.filter((item: any) => item.id === editValue).map((item: any) => {
                    const data = [
                        {
                            label: "Name",
                            value: name,
                            onChange: (e: any) => setName(e.target.value),
                            required: true,
                            type: "name"
                        },
                        {
                            label: "Email",
                            value: email,
                            onChange: (e: any) => setEmail(e.target.value),
                            required: true,
                            type: "email"
                        },
                        {
                            label: "Username",
                            value: username,
                            onChange: (e: any) => setUsername(e.target.value),
                            required: true,
                            type: "username"
                        },
                        {
                            label: "City",
                            value: city,
                            onChange: (e: any) => setCity(e.target.value),
                            required: true,
                            type: "city"
                        },
                    ]
                    return (
                        <STYLE.TableWrapper>
                            <STYLE.TableWrapperHead>
                                <h2>Update {item.name}'s Details</h2>
                            </STYLE.TableWrapperHead>
                            <STYLE.Form>
                                {data.map((item: any) => {
                                    return (
                                        <STYLE.InputContainer>
                                            <div>{item.label}</div>
                                            <input 
                                                type={item.type} 
                                                value={item.value}
                                                onChange={item.onChange}
                                                style={{
                                                    padding: '10px 20px'
                                                }}
                                            />
                                        </STYLE.InputContainer>
                                    )
                                })}
                                <STYLE.ButtonContainer>
                                    <span style={{marginRight: '10px'}}>
                                        <STYLE.Button 
                                            type="danger" 
                                            onClick={() => cancel()}
                                        >Cancel</STYLE.Button>
                                    </span>
                                    <STYLE.Button 
                                        type="success" 
                                        onClick={() => submitUpdate()}
                                    >Submit</STYLE.Button>
                                </STYLE.ButtonContainer>
                            </STYLE.Form>
                        </STYLE.TableWrapper>
                    )
                })}
                
            </>
        ) : (
            <STYLE.TableWrapper>
                <STYLE.TableWrapperHead>
                    <h2>User List</h2>
                    <STYLE.Button onClick={() => setSection("new")}>Add new</STYLE.Button>
                </STYLE.TableWrapperHead>
                <STYLE.TableWrapperContent>
                    <STYLE.Sort onClick={() => setSortToggle(!sortToggle)} active={true}>
                        <span>Sort</span>
                        <span style={{
                            marginLeft: '10px',
                            fontWeight: 'bolder',
                            color: sortValue === "-username" ? "red" : "grey"
                        }}>
                            <AiOutlineArrowUp />
                        </span>
                        <span style={{
                            fontWeight: 'bolder',
                            color: sortValue === "username" ? "red" : "grey"
                        }}>
                            <AiOutlineArrowDown />
                        </span>
                    </STYLE.Sort>
                    <STYLE.Table>
                        <STYLE.TableHead>
                            <STYLE.TableRow>
                                {tableHead.map((item: any) => {
                                    return <STYLE.TableItem>{item}</STYLE.TableItem>
                                })}
                            </STYLE.TableRow>
                        </STYLE.TableHead>
                        <STYLE.TableBody>
                            {list.length > 0 ? list.sort(dynamicSort(sortValue)).map((item: any) => {
                                    return (
                                        <STYLE.TableRow>
                                            <STYLE.TableItem>{item.id}</STYLE.TableItem>
                                            <STYLE.TableItem>{item.name}</STYLE.TableItem>
                                            <STYLE.TableItem>{item.username}</STYLE.TableItem>
                                            <STYLE.TableItem>{item.email}</STYLE.TableItem>
                                            <STYLE.TableItem>{item.address.city}</STYLE.TableItem>
                                            <STYLE.TableItem>
                                                <STYLE.Button type="success" onClick={() => editFunction(item)}>EDIT</STYLE.Button>    
                                            </STYLE.TableItem>
                                            <STYLE.TableItem>
                                                <STYLE.Button type="danger" onClick={() => deleteFunction(item.id)}>DELETE</STYLE.Button>    
                                            </STYLE.TableItem>
                                        </STYLE.TableRow>
                                    )
                                }
                            ) : loading ? (
                                <STYLE.NotFound><i>Loading</i></STYLE.NotFound>
                            ) : (
                                <STYLE.NotFound>No records found. Add a record to proceed</STYLE.NotFound>
                            )}
                        </STYLE.TableBody>
                    </STYLE.Table>
                </STYLE.TableWrapperContent>
            </STYLE.TableWrapper>

        )}
    </STYLE.Container>
  );
}

export default Home;
