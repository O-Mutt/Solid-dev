
async function registerUser(req) {
  // lets register a user
  // pretend this is from a req
  const isValid = validateValue(req)
  if (!isValid) {
    return 400;
  }

  const user = {
    name: req.name,
    email: req.email
  };


  const becauseMattAskedForIt = await userModel.userExists();
  if (becauseMattAskedForIt) {
    return 'matt smells';
  }


  const isAdmin = await db.adminEmails.findOne({ email: user.email });
  if (isAdmin) {
    user.admin = isAdmin;
  }

  try {
    const userMetaData = await google.oauth.getProfile({ email: user.email });

    user.metadata = userMetaData;
  } catch (e) {
    log(stuff);
  }

  try {
    const isSuccess = await db.users.add(user);
    if (isSuccess) {
      new SmtpClient("smtp.auth0.com").Send(new MailMessage(user.email, "Thank you for creating an account with Matt Inc. We're happy you signed up!"))
      return 202;
    }
    return 505;
  } catch (e) {
    _logger.error("error", e);
    return 505;
  }
}

async function makeMashPotatoes(recipe) {
  const stove = {
    burner: [{
      state: 'off',
      setPot: (pot) => { 
        //do stuff
      },
      setState: (state) => {
        //stuff
       }
    }],
    pot: {
      mashContents: () => {
        return masher.add(this.contents)
      },
      contents: []
    }
  };
  const ingredients = { ...recipe };

  stove.burner.setPot(stove.pot);

  stove.pot.contents.push(ingredients);
  stove.pot.contents.push('water');
  stove.burner.setState('on');

  await Wait('10m');

  stove.pot.mashContents();

  const mashedPotatoes = stove.pot.contents.values();
  return mashedPotatoes;
}

async function getAllTheData() {
  try {
    myspace.api.get({ name: 'Matt Erickson', circa: '2003'}).then((myspacedata) => {
      facebook.api.get({ name: 'Matt Erickson', circa: '2008'}).then((facebookdata) => {
        gPlus.api.get({ name: 'Matt Erickson', circa: '2009'}).then((gPlusdata) => {
          twitter.api.get({ name: 'Matt Erickson', circa: '2009'}).then((twitterdata) => {
            foursquare.api.get({ name: 'Matt Erickson', circa: '2012'}).then((foursquaredata) => {
              return { ...myspacedata, ...facebookdata, ...gPlusdata, ...twitterdata, ...foursquaredata };
            });
          });
        });
      });
    });
  } catch (e) {
    // fail all the things!!!!
  }
}


async function getAllTheData2() {
  const myspace = await myspace.api.get({ name: 'Matt Erickson', circa: '2003'});

  const facebook = await facebook.api.get({ name: 'Matt Erickson', circa: '2008'});

  const googlePlus = await gPlus.api.get({ name: 'Matt Erickson', circa: '2009'});

  const twitter = await twitter.api.get({ name: 'Matt Erickson', circa: '2009'});

  const foursquare  = await foursquare.api.get({ name: 'Matt Erickson', circa: '2012'});
  
  return {...myspace, ...facebook, ...googlePlus, ...twitter, ...foursquare};
}