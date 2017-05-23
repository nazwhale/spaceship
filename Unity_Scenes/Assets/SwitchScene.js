var whichScene : String;
function Update () {
	if( Input.GetButtonDown("Jump") == true) {

	SceneManagement.SceneManager.LoadScene(whichScene); // it number or name, string

	}

}
