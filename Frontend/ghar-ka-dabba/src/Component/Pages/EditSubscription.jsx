import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { IP_ADDRS } from "../../Service/Constant";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

function EditSubscription() {

  const { id } = useParams();
  var vendorobj = JSON.parse(sessionStorage.getItem("vendor"));

  const navigate = useNavigate();

  useEffect(() => {

    console.log(id)
    axios.get(`${IP_ADDRS}/subscription/plan/${id}`)
      .then(res => {
        setsubsobj({
          ...subsobj, name: res.data.name,
          description: res.data.name,
          price: res.data.price,
          planType: res.data.planType,
          id: id,
        })
      })
      .catch(err => {
        console.log(err)
        swal("Something Went Wrong", "", "error")
      })
    axios.get(`${IP_ADDRS}/tiffins/getTiffinsBySubscriptionId/${id}`)
      .then(res => {
        console.log(res.data)
        for (var i = 0; i < 7; i++) {
          console.log(res.data[i].day)
          //setting sundaylunch data
          if (res.data[i].day == "SUNDAY_LUNCH") {
            setSundayLunch({
              ...sundayLunch, name: res.data[i].name,
              id: res.data[i].id,
              description: res.data[i].description,
              price: res.data[i].price,
              foodType: res.data[i].foodType,
            })
          }
          //setting mondaylunch data
          if (res.data[i].day == "MONDAY_LUNCH") {
            setMondayLunch({
              ...mondayLunch, name: res.data[i].name,
              description: res.data[i].description,
              id: res.data[i].id,
              price: res.data[i].price,
              foodType: res.data[i].foodType,
            })
          }
          //setting tuesdaylunch data
          if (res.data[i].day == "TUESDAY_LUNCH") {
            setTuesdayLunch({
              ...tuesdayLunch, name: res.data[i].name,
              id: res.data[i].id,
              description: res.data[i].description,
              price: res.data[i].price,
              foodType: res.data[i].foodType,
            })
          }
          //setting wednesdaylunch data
          if (res.data[i].day == "WEDNESDAY_LUNCH") {
            setWednesdayLunch({
              ...wednesdayLunch, name: res.data[i].name,
              id: res.data[i].id,
              description: res.data[i].description,
              price: res.data[i].price,
              foodType: res.data[i].foodType,
            })
          }
          //thurs
          if (res.data[i].day == "THURSDAY_LUNCH") {
            setThursdayLunch({
              ...thursdayLunch, name: res.data[i].name,
              id: res.data[i].id,
              description: res.data[i].description,
              price: res.data[i].price,
              foodType: res.data[i].foodType,
            })
          }
          //setting fridaylunch data
          if (res.data[i].day == "FRIDAY_LUNCH") {
            setFridayLunch({
              ...fridayLunch, name: res.data[i].name,
              id: res.data[i].id,
              description: res.data[i].description,
              price: res.data[i].price,
              foodType: res.data[i].foodType,
            })
          }
          //setting saturdaylunch data
          if (res.data[i].day == "SATURDAY_LUNCH") {
            setSaturdayLunch({
              ...saturdayLunch, name: res.data[i].name,
              id: res.data[i].id,
              description: res.data[i].description,
              price: res.data[i].price,
              foodType: res.data[i].foodType,
            })
          }
        }

      })

  }, [])

  const [sunImageFile, setSunImageFile] = useState();
  const [monImageFile, setMonImageFile] = useState();
  const [tueImageFile, setTueImageFile] = useState();
  const [wedImageFile, setWedImageFile] = useState();
  const [thuImageFile, setThuImageFile] = useState();
  const [friImageFile, setFriImageFile] = useState();
  const [satImageFile, setSatImageFile] = useState();
  const [subPlanImage, setSubPlanImage] = useState();


  const [subsobj, setsubsobj] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    planType: "",
  })

  const [sundayLunch, setSundayLunch] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "SUNDAY_LUNCH"
  })

  const [mondayLunch, setMondayLunch] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "MONDAY_LUNCH"
  })

  const [tuesdayLunch, setTuesdayLunch] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "TUESDAY_LUNCH"
  })

  const [wednesdayLunch, setWednesdayLunch] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "WEDNESDAY_LUNCH"
  })

  const [thursdayLunch, setThursdayLunch] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "THURSDAY_LUNCH"
  })

  const [fridayLunch, setFridayLunch] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "FRIDAY_LUNCH"
  })

  const [saturdayLunch, setSaturdayLunch] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "SATURDAY_LUNCH"
  })

  const handleChange = (event) => {
    setsubsobj({
      ...subsobj,
      [event.target.name]: event.target.value,
    });
  };

  const sunHandleChange = (event) => {
    setSundayLunch({
      ...sundayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const monHandleChange = (event) => {
    setMondayLunch({
      ...mondayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const tueHandleChange = (event) => {
    setTuesdayLunch({
      ...tuesdayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const wedHandleChange = (event) => {
    setWednesdayLunch({
      ...wednesdayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const thurHandleChange = (event) => {
    setThursdayLunch({
      ...thursdayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const friHandleChange = (event) => {
    setFridayLunch({
      ...fridayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const satHandleChange = (event) => {
    setSaturdayLunch({
      ...saturdayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const foodtypes = ["VEG", "NONVEG"];

  const options = ['WEEKLY', 'MONTHLY'];

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (subsobj.name === '' || subsobj.description === '' || subsobj.price === '' || subsobj.planType === '' ||
      sundayLunch.description === '' || sundayLunch.price === '' || sundayLunch.foodType === '' || sundayLunch.name === '' ||
      mondayLunch.description === '' || mondayLunch.price === '' || mondayLunch.foodType === '' || mondayLunch.name === '' ||
      tuesdayLunch.description === '' || tuesdayLunch.price === '' || tuesdayLunch.foodType === '' || tuesdayLunch.name === '' ||
      wednesdayLunch.description === '' || wednesdayLunch.price === '' || wednesdayLunch.foodType === '' || wednesdayLunch.name === '' ||
      thursdayLunch.description === '' || thursdayLunch.price === '' || thursdayLunch.foodType === '' || thursdayLunch.name === '' ||
      fridayLunch.description === '' || fridayLunch.price === '' || fridayLunch.foodType === '' || fridayLunch.name === '' ||
      saturdayLunch.description === '' || saturdayLunch.price === '' || saturdayLunch.foodType === '' || saturdayLunch.name === ''
    ) {
      swal("Please Enter All Fields", "", "error")
      return;
    }

    else {
      console.log(1)
      axios.put(`${IP_ADDRS}/subscription`, subsobj)
        .then(res => {
          console.log(2)
          //add subscription plan image
          {
            if (subPlanImage != null) {
              const form = new FormData();
              form.append("subPlanImage", subPlanImage);
              const options = {
                method: 'POST',
                url: `${IP_ADDRS}/subscription/${id}/subPlanImage`,
                headers: {
                  Authorization: ``,
                  'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                },
                data: form
              };

              axios.request(options).then(response => {
                console.log(response.data)
              }).catch(error => {
                console.log(error);
              });
            }
          }
          console.log(3)
          // sundaylunch
          axios.put(`${IP_ADDRS}/tiffins/editTiffin`, sundayLunch)
            .then(resp => {
              console.log(4)
              if (sunImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", sunImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${sundayLunch.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // Mondaylunch
          axios.put(`${IP_ADDRS}/tiffins/editTiffin`, mondayLunch)
            .then(resp => {
              console.log(resp.data.id)
              if (monImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", monImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${mondayLunch.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // tuesdaylunch
          axios.put(`${IP_ADDRS}/tiffins/editTiffin`, tuesdayLunch)
            .then(resp => {
              if (tueImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", tueImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${tuesdayLunch.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // Wednesday lunch
          axios.put(`${IP_ADDRS}/tiffins/editTiffin`, wednesdayLunch)
            .then(resp => {
              if (wedImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", wedImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${wednesdayLunch.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // Thursday lunch
          axios.put(`${IP_ADDRS}/tiffins/editTiffin`, thursdayLunch)
            .then(resp => {
              if (thuImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", thuImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${thursdayLunch.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // fridaylunch
          axios.put(`${IP_ADDRS}/tiffins/editTiffin`, fridayLunch)
            .then(resp => {
              if (friImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", friImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${fridayLunch.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // Saturday lunch
          axios.put(`${IP_ADDRS}/tiffins/editTiffin`, saturdayLunch)
            .then(resp => {
              if (satImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", satImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${saturdayLunch.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          swal("Subscription Plan Edited Successfully", "", "success")
          setsubsobj({ ...subsobj, name: '', description: '', price: '', planType: '' })
          setSundayLunch({ ...sundayLunch, name: '', description: '', price: '', foodType: '' })
          setMondayLunch({ ...mondayLunch, name: '', description: '', price: '', foodType: '' })
          setTuesdayLunch({ ...tuesdayLunch, name: '', description: '', price: '', foodType: '' })
          setWednesdayLunch({ ...wednesdayLunch, name: '', description: '', price: '', foodType: '' })
          setThursdayLunch({ ...thursdayLunch, name: '', description: '', price: '', foodType: '' })
          setFridayLunch({ ...fridayLunch, name: '', description: '', price: '', foodType: '' })
          setSaturdayLunch({ ...saturdayLunch, name: '', description: '', price: '', foodType: '' })
          setSunImageFile()
          setMonImageFile()
          setTueImageFile()
          setWedImageFile()
          setThuImageFile()
          setFriImageFile()
          setSatImageFile()
          setSubPlanImage()
          navigate("/vendor")

        })

        .catch(err => {
          console.log(err)
          swal("Something Went Wrong", "", "Error")
        })


    }


  };

  return (
    <div className="card col-md-10 offset-md-1">
      <div style={{ marginTop: 20, marginLeft: 20 }}>
        <h5>Hi {vendorobj.firstName},</h5>
      </div>
      <center>
        <div>
          <h2 className="text-center">
            <b>Edit Subscription Plan</b>
          </h2>
          <hr className="lead"></hr>
        </div>

        <form>
          {/* Labels and inputs for form data */}
          <label className="label">Plan Name</label>
          <input onChange={handleChange} name="name"
            value={subsobj.name} type="text" style={{ width: 400 }} />

          <label className="label">Description</label>
          <textarea onChange={handleChange} name="description"
            value={subsobj.description} style={{ width: 400 }} />

          <label className="label">Price</label>
          <input onChange={handleChange} name="price"
            value={subsobj.price} type="number" />

          <label className="label">Plan Type</label>
          <p>(Weekly = 7 days and Monthly = 28 days)</p>
          <p>Saved Plan Type : {subsobj.planType}</p>
          <select onChange={handleChange} name="planType">
            <option>---select one plan---</option>
            {options.map((option, index) => {
              return <option key={index} >
                {option}
              </option>
            })}
          </select>
          <br />
          <br />


          <img src={`${IP_ADDRS}/subscription/${id}/dp`} height={200} width={200} /><br></br>
          <label> Subscription Plan Image</label>
          <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="subPlanImage" onChange={(e) => {
            setSubPlanImage(e.target.files[0])
          }} style={{ width: 400 }}></input>

          <br />   <br />
          <table className="table table-bordered" style={{ textAlign: "center" }}>
            <thead className="bg-dark text-light">
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Food Type</th>
                <th scope="col" style={{ width: 120 }}>Price</th>
                <th scope="col">ImagePath</th>
              </tr>
            </thead>
            <tbody>
              {/*---------------------------------------------------------------------------- */}
              <tr>

                <td>Sunday</td>

                <td><textarea onChange={sunHandleChange} name="name"
                  value={sundayLunch.name} /></td>

                <td><textarea onChange={sunHandleChange} name="description"
                  value={sundayLunch.description} />
                </td>


                <td><span>Saved food Type {sundayLunch.foodType}</span>
                  <select onChange={sunHandleChange} name="foodType">
                    <option>select one</option>
                    {foodtypes.map((option, index) => {
                      return <option key={index} >
                        {option}
                      </option>
                    })}
                  </select></td>


                <td><input onChange={sunHandleChange} name="price"
                  value={sundayLunch.price} type="number" style={{ width: 100 }} /></td>

                <td><img src={`${IP_ADDRS}/tiffins/${sundayLunch.id}/tiffinImage`} height={200} width={200} />
                  <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="sundayImage" onChange={(e) => {
                    setSunImageFile(e.target.files[0])
                  }}></input></td>
              </tr>
              {/*---------------------------------------------------------------------------- */}
              <tr>

                <td>Monday</td>

                <td><textarea onChange={monHandleChange} name="name"
                  value={mondayLunch.name} /></td>

                <td><textarea onChange={monHandleChange} name="description"
                  value={mondayLunch.description} />
                </td>


                <td><span>Saved food Type {mondayLunch.foodType}</span><select onChange={monHandleChange} name="foodType">
                  <option>select one</option>
                  {foodtypes.map((option, index) => {
                    return <option key={index} >
                      {option}
                    </option>
                  })}
                </select></td>

                <td><input onChange={monHandleChange} name="price"
                  value={mondayLunch.price} type="number" style={{ width: 100 }} /></td>

                <td><img src={`${IP_ADDRS}/tiffins/${mondayLunch.id}/tiffinImage`} height={200} width={200} />
                  <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="mondayImage" onChange={(e) => {
                    setMonImageFile(e.target.files[0])
                  }}></input></td>
              </tr>
              {/*---------------------------------------------------------------------------- */}
              <tr>

                <td>Tuesday</td>

                <td><textarea onChange={tueHandleChange} name="name"
                  value={tuesdayLunch.name} type="text" /></td>

                <td><textarea onChange={tueHandleChange} name="description"
                  value={tuesdayLunch.description} />
                </td>


                <td><span>Saved food Type {tuesdayLunch.foodType}</span><select onChange={tueHandleChange} name="foodType">
                  <option>select one</option>
                  {foodtypes.map((option, index) => {
                    return <option key={index} >
                      {option}
                    </option>
                  })}
                </select></td>

                <td><input onChange={tueHandleChange} name="price"
                  value={tuesdayLunch.price} type="number" style={{ width: 100 }} /></td>

                <td><img src={`${IP_ADDRS}/tiffins/${tuesdayLunch.id}/tiffinImage`} height={200} width={200} />
                  <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="tuesdayImage" onChange={(e) => {
                    setTueImageFile(e.target.files[0])
                  }}></input></td>
              </tr>
              {/*---------------------------------------------------------------------------- */}
              <tr>

                <td>Wednesday</td>

                <td><textarea onChange={wedHandleChange} name="name"
                  value={wednesdayLunch.name} type="text" /></td>

                <td><textarea onChange={wedHandleChange} name="description"
                  value={wednesdayLunch.description} />
                </td>


                <td> <span>Saved food Type {wednesdayLunch.foodType}</span><select onChange={wedHandleChange} name="foodType">
                  <option>select one</option>
                  {foodtypes.map((option, index) => {
                    return <option key={index} >
                      {option}
                    </option>
                  })}
                </select></td>

                <td><input onChange={wedHandleChange} name="price"
                  value={wednesdayLunch.price} type="number" style={{ width: 100 }} /></td>

                <td>
                  <img src={`${IP_ADDRS}/tiffins/${wednesdayLunch.id}/tiffinImage`} height={200} width={200} />
                  <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="wednesdayImage" onChange={(e) => {
                    setWedImageFile(e.target.files[0])
                  }}></input></td>
              </tr>
              {/*---------------------------------------------------------------------------- */}
              <tr>

                <td>Thursday</td>

                <td><textarea onChange={thurHandleChange} name="name"
                  value={thursdayLunch.name} /></td>

                <td><textarea onChange={thurHandleChange} name="description"
                  value={thursdayLunch.description} />
                </td>


                <td> <span>Saved food Type {thursdayLunch.foodType}</span><select onChange={thurHandleChange} name="foodType">
                  <option>select one</option>
                  {foodtypes.map((option, index) => {
                    return <option key={index} >
                      {option}
                    </option>
                  })}
                </select></td>

                <td><input onChange={thurHandleChange} name="price"
                  value={thursdayLunch.price} type="number" style={{ width: 100 }} /></td>

                <td>
                  <img src={`${IP_ADDRS}/tiffins/${thursdayLunch.id}/tiffinImage`} height={200} width={200} />
                  <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="thursdayImage" onChange={(e) => {
                    setThuImageFile(e.target.files[0])
                  }}></input></td>
              </tr>
              {/*---------------------------------------------------------------------------- */}
              <tr>

                <td>Friday</td>

                <td><textarea onChange={friHandleChange} name="name"
                  value={fridayLunch.name} type="text" /></td>

                <td><textarea onChange={friHandleChange} name="description"
                  value={fridayLunch.description} />
                </td>


                <td><span>Saved food Type {fridayLunch.foodType}</span><select onChange={friHandleChange} name="foodType">
                  <option>select one</option>
                  {foodtypes.map((option, index) => {
                    return <option key={index} >
                      {option}
                    </option>
                  })}
                </select></td>

                <td><input onChange={friHandleChange} name="price"
                  value={fridayLunch.price} type="number" style={{ width: 100 }} /></td>

                <td>
                  <img src={`${IP_ADDRS}/tiffins/${fridayLunch.id}/tiffinImage`} height={200} width={200} />
                  <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="fridayImage" onChange={(e) => {
                    setFriImageFile(e.target.files[0])
                  }}></input></td>
              </tr>
              {/*---------------------------------------------------------------------------- */}
              <tr>

                <td>Saturday</td>

                <td><textarea onChange={satHandleChange} name="name"
                  value={saturdayLunch.name} /></td>

                <td><textarea onChange={satHandleChange} name="description"
                  value={saturdayLunch.description} />
                </td>


                <td><span>Saved food Type {saturdayLunch.foodType}</span><select onChange={satHandleChange} name="foodType">
                  <option>select one</option>
                  {foodtypes.map((option, index) => {
                    return <option key={index} >
                      {option}
                    </option>
                  })}
                </select></td>

                <td><input onChange={satHandleChange} name="price"
                  value={saturdayLunch.price} type="number" style={{ width: 100 }} /></td>

                <td>
                  <img src={`${IP_ADDRS}/tiffins/${sundayLunch.id}/tiffinImage`} height={200} width={200} />
                  <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="saturdayImage" onChange={(e) => {
                    setSatImageFile(e.target.files[0])
                  }}></input></td>
              </tr>

            </tbody>
          </table>
          <table style={{ margin: "auto" }}>
            <thead />
            <tbody>
              <tr>
                <td> <button onClick={handleSubmit} className="btn btn-primary" type="submit">Submit</button></td>
                <td> <button className="btn btn-danger" onClick={() => { navigate("/vendor") }}>Cancel</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      </center>
    </div>
  );
}

export default EditSubscription;