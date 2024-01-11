import mongoose from "mongoose";

import { userModel } from "../src/dao/models/user.model.js";
import Assert from "assert";

mongoose.connect("mongodb://127.0.0.1:27017/tutoria");

const assert = Assert.strict;

describe("UserModel Dao", () => { 
  before(() => { 
    let userDao = new userModel();
    
  })
  
  // beforeEach(() => { 
  //   this.timeOut = 5000;
  // })
  
  it("El get debe devolver un array de usuarios", async () => {
   
    const users = await this.userDao.get();
    assert.strictEqual(Array.isArray(users), true);
  })
})
 
