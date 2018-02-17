package application;


import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.BorderPane;
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

	@Override
	public void start(Stage primaryStage) {
		try {
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
	        tabPane.getTabs().add(tbMap);

			Scene scene = new Scene(tabPane,400,600);

			scene.getStylesheets().add(getClass().getResource("application.css").toExternalForm());
			primaryStage.setScene(scene);
			primaryStage.show();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public Pane buildDash(){
		VBox root = new VBox();
		root.setPadding(new Insets(25, 25, 25, 25));
		root.setSpacing(25);

//		Pane top = buildTopRow();
//		root.getChildren().add(top);
//
//		Pane middle = buildMiddleRow(stage);
//		root.getChildren().add(middle);
//
//		txaDisplay = new TextArea();
//		txaDisplay.setId("border-textArea");
//		root.getChildren().add(txaDisplay);

		return root;
	}

	public Pane buildLeader(){
		VBox leader = new VBox();
		leader.setPadding(new Insets(50, 50, 50, 50));
		leader.setSpacing(25);

//		HBox destHBox = new HBox();
//		Label lbl1 = new Label("Destination: ");
//		txfdest = new TextField();
//		destHBox.getChildren().addAll(lbl1, txfdest);
//		leader.getChildren().add(destHBox);
//
//		Button teleportBtn = new Button("Teleport");
//		teleportBtn.setOnAction(new TeleportButtonEventHandler());
//		leader.getChildren().add(teleportBtn);
//		VBox.setMargin(teleportBtn, new Insets(0,0,0,110));

		txaDisplay = new TextArea();
		txaDisplay.setId("border-textArea");
		leader.getChildren().add(txaDisplay);

		return leader;
	}
	public Pane buildLogin(){
		VBox login = new VBox();
		login.setPadding(new Insets(50, 50, 50, 50));
		login.setSpacing(25);

		HBox uNameHBox = new HBox();
		Label lbl1 = new Label("Username: ");
		txfuName = new TextField();
		uNameHBox.getChildren().addAll(lbl1, txfuName);
		login.getChildren().add(uNameHBox);

		HBox passHBox = new HBox();
		Label lbl2 = new Label("Password: ");
		txfpass = new TextField();
		passHBox.getChildren().addAll(lbl2, txfpass);
		login.getChildren().add(passHBox);

		Button loginBtn = new Button("Login");
		loginBtn.setOnAction(new LoginButtonEventHandler());
		login.getChildren().add(loginBtn);
		VBox.setMargin(loginBtn, new Insets(0,0,0,110));

		return login;
	}
	public class LoginButtonEventHandler implements EventHandler<ActionEvent>{

		public void handle(ActionEvent e){
			tbDash.setContent(buildDash());
			tbDash.setDisable(false);
			tbLeader.setDisable(false);
		}
	}

	public static void main(String[] args) {
		launch(args);
	}
}
