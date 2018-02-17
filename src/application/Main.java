package application;


import javafx.application.Application;
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


public class Main extends Application {
	protected UserManager um = new UserManager();
	protected TextArea txaDisplay = new TextArea();
	protected TextField txfdest;
	protected TextField txfid;
	protected Tab tbMap;
	protected TabPane tabPane;

	@Override
	public void start(Stage primaryStage) {
		try {
			tabPane = new TabPane();

			Tab tbLogin = new Tab();
			tbLogin.setText("Dashboard");
			tbLogin.setContent(buildLogin());
			tbLogin.setClosable(false);
			tabPane.getTabs().add(tbLogin);

			Tab tbDash = new Tab();
			tbDash.setText("Dashboard");
			tbDash.setContent(buildRoot(primaryStage));
			tbDash.setClosable(false);
			tbGraph.setDisable(true);
			tabPane.getTabs().add(tbDash);

			Tab tbLeader = new Tab();
			tbLeader.setText("LeaderBoard");
			tbLeader.setContent(buildLeader());
			tbLeader.setClosable(false);
			tbGraph.setDisable(true);
			tabPane.getTabs().add(tbLeader);

			tbMap = new Tab();
			tbMap.setText("Map");
	        tabPane.getTabs().add(tbMap);

			Scene scene = new Scene(tabPane,750,500);

			scene.getStylesheets().add(getClass().getResource("application.css").toExternalForm());
			primaryStage.setScene(scene);
			primaryStage.show();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public Pane buildRoot(Stage stage){
		VBox root = new VBox();
		root.setPadding(new Insets(25, 25, 25, 25));
		root.setSpacing(25);

		Pane top = buildTopRow();
		root.getChildren().add(top);

		Pane middle = buildMiddleRow(stage);
		root.getChildren().add(middle);

		txaDisplay = new TextArea();
		txaDisplay.setId("border-textArea");
		root.getChildren().add(txaDisplay);

		return root;
	}

	public Pane buildLeader(){
		VBox leader = new VBox();
		leader.setPadding(new Insets(50, 50, 50, 50));
		leader.setSpacing(25);

		HBox destHBox = new HBox();
		Label lbl1 = new Label("Destination: ");
		txfdest = new TextField();
		destHBox.getChildren().addAll(lbl1, txfdest);
		leader.getChildren().add(destHBox);

		Button teleportBtn = new Button("Teleport");
		teleportBtn.setOnAction(new TeleportButtonEventHandler());
		leader.getChildren().add(teleportBtn);
		VBox.setMargin(teleportBtn, new Insets(0,0,0,110));

		txaDisplay = new TextArea();
		txaDisplay.setId("border-textArea");
		leader.getChildren().add(txaDisplay);

		return leader;
	}
}
