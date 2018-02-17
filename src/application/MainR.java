package application;


import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;


public class MainR extends Application {
	protected UserManager um = new UserManager();
	protected TextArea txaDisplay = new TextArea();
	protected TextField txfuName;
	protected TextField txfpass;
	protected TextField txfid;
	protected Tab tbMap;
	protected Tab tbDash;
	protected Tab tbLeader;
	protected TabPane tabPane;
	protected User myUser;
	protected ComboBox<String> types;
	protected ProgressBar pb;

	@Override
	public void start(Stage primaryStage) {
		try {

			um.addUser(new User("mallory","1234"));
			um.addUser(new User("christian"));
			um.addUser(new User("mickey"));
			um.addUser(new User("tyler"));
			um.addUser(new User("jordan"));
			um.getUserWithUserName("mallory").setrxp(130);
			um.getUserWithUserName("christian").setrxp(75);
			um.getUserWithUserName("mickey").setrxp(143);
			um.getUserWithUserName("tyler").setrxp(10);
			um.getUserWithUserName("jordan").setrxp(17);

			tabPane = new TabPane();

			Tab tbLogin = new Tab();
			tbLogin.setText("Login");
			tbLogin.setContent(buildLogin());
			tbLogin.setClosable(false);
			tabPane.getTabs().add(tbLogin);

			tbDash = new Tab();
			tbDash.setText("Dashboard");
			tbDash.setClosable(false);
			tbDash.setDisable(true);
			tabPane.getTabs().add(tbDash);

			tbLeader = new Tab();
			tbLeader.setText("LeaderBoard");
			tbLeader.setContent(buildLeader());
			tbLeader.setClosable(false);
			tbLeader.setDisable(true);
			tabPane.getTabs().add(tbLeader);

			tbMap = new Tab();
			tbMap.setText("Map");
			tbMap.setContent(buildMap());
	        tabPane.getTabs().add(tbMap);

			Scene scene = new Scene(tabPane,400,600);

			scene.getStylesheets().add(getClass().getResource("application.css").toExternalForm());
			primaryStage.setScene(scene);
			primaryStage.show();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public Pane buildMap(){
		Pane mapPane = new Pane();
//		ImageView selectedImage = new ImageView();
//        Image image1 = new Image("map.png");
//
//        selectedImage.setImage(image1);
//
//        mapPane.getChildren().addAll(selectedImage);
        return mapPane;
	}

	public Pane buildDash(User u){
		VBox root = new VBox();
		myUser = u;

		VBox stats = new VBox();
		stats.setPadding(new Insets(25, 25, 25, 25));
		stats.setSpacing(25);
		Label lbl1 = new Label(myUser.getuserName());
		lbl1.setId("user-name");
		stats.getChildren().add(lbl1);

		pb = new ProgressBar(0);
		int myRXP = myUser.getrxp();
		pb.setProgress((myRXP%100)/100.0);
		pb.setPrefWidth(350);
		pb.setPrefHeight(30);
		stats.getChildren().add(pb);

		HBox addRe = new HBox();
		addRe.setPadding(new Insets(25, 25, 25, 25));
		addRe.setSpacing(25);

		root.getChildren().add(stats);

		types = new ComboBox<>();
		types.setValue("Choose a Product");
		types.getItems().addAll(
	            "Can",
	            "Bottle",
	            "Paper Cup",
	            "Paper",
	            "Battery"
	        );
		Button addRBtn = new Button("Add the Recycle");
		addRBtn.setOnAction(new AddRButtonEventHandler());
		addRe.getChildren().add(types);
		addRe.getChildren().add(addRBtn);

		root.getChildren().add(addRe);

		return root;
	}

	public Pane buildLeader(){
		VBox leader = new VBox();
		leader.setPadding(new Insets(50, 50, 50, 50));
		leader.setSpacing(25);

		TextArea txaLeader = new TextArea();
		txaLeader.setId("border-textArea");
		txaLeader.setText(um.printLeaderBoard());
		leader.getChildren().add(txaLeader);

		return leader;
	}
	public Pane buildLogin(){
		VBox login = new VBox();
		login.setPadding(new Insets(50, 50, 50, 50));
		login.setSpacing(25);

		Label lbl1 = new Label("Username: ");
		txfuName = new TextField();
		Label lbl2 = new Label("Password: ");
		txfpass = new TextField();

		Button loginBtn = new Button("Login");
		loginBtn.setOnAction(new LoginButtonEventHandler());

		Button registerBtn = new Button("Register");
		registerBtn.setOnAction(new RegisterButtonEventHandler());

		GridPane gPFields = new GridPane();
		gPFields.setHgap(7);
		gPFields.setVgap(10);
		gPFields.add(lbl1, 0, 0);
		gPFields.add(txfuName, 1, 0);
		gPFields.add(lbl2, 0, 1);
		gPFields.add(txfpass, 1, 1);
		gPFields.add(loginBtn, 1, 3);

//		txaDisplay = new TextArea();
//		txaDisplay.setId("border-textArea");
//		txaDisplay.setPrefWidth(200);
//		txaDisplay.setPrefHeight(50);
//		gPFields.add(txaDisplay, 1, 6);

		login.getChildren().add(gPFields);

		return login;
	}
	public class LoginButtonEventHandler implements EventHandler<ActionEvent>{

		public void handle(ActionEvent e){

			String uName = txfuName.getText();
			String pass = txfpass.getText();
			if(um.hasUser(uName)){
				if(um.getUserWithUserName(uName).checkPass(pass)){
					myUser = um.getUserWithUserName(uName);
					tbDash.setContent(buildDash(myUser));
					tbDash.setDisable(false);
					tbLeader.setDisable(false);
				}
			}
//			else
//				txaDisplay.setText("Invalid Username or password.");
		}
	}
	public class RegisterButtonEventHandler implements EventHandler<ActionEvent>{

		public void handle(ActionEvent e){

		}
	}

	public class AddRButtonEventHandler implements EventHandler<ActionEvent>{

		public void handle(ActionEvent e){
			String type = (String)types.getValue();
			System.out.print("type:" + type);
			System.out.print("rxp before:" + myUser.getrxp());
			switch(type){
				case "Can":
					myUser.addRecycle(2);
					break;
				case "Bottle":
					myUser.addRecycle(5);
					break;
				case "Paper cup":
					myUser.addRecycle(4);
					break;
				case "Paper":
					myUser.addRecycle(1);
					break;
				case "Battery":
					myUser.addRecycle(10);
					break;

			}
			System.out.print("rxp after:" + myUser.getrxp());
			tbLeader.setContent(buildLeader());
			int myRXP = myUser.getrxp();
			pb.setProgress((myRXP%100)/100.0);
		}
	}

	public static void main(String[] args) {
		launch(args);
	}
}
