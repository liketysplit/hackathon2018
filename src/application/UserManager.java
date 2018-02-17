package application;

import java.util.ArrayList;
import java.util.Collections;

public class UserManager {
	private ArrayList<User> myUsers = new ArrayList<>();

	public UserManager(){
	}

	public boolean addUser(User u){
		boolean flag = true;
		for(User u2 : myUsers){
			if(u2.equals(u)){
				flag = false;
				break;
			}
		}

		if(flag){
			myUsers.add(u);
			return true;
		}
		else
			return false;
	}

	public boolean hasUser(String uName){

		for(User u : myUsers){
			if(u.getuserName().equals(uName)){
				return true;
			}
		}
		return false;
	}

	public User getUserWithUserName(String userName){
		User u = new User(userName);
		int i = myUsers.indexOf(u);
		if(i >= 0)
			return myUsers.get(i);
		else
			return null;
	}

	public ArrayList<User> sortedUsers(){
		ArrayList<User> clonedUsers = new ArrayList<>();
		for(User u : myUsers){
			clonedUsers.add(u);
		}
		Collections.sort(clonedUsers, Collections.reverseOrder());
		return clonedUsers;
	}

	public String printLeaderBoard(){
		StringBuilder s = new StringBuilder();
		myUsers = this.sortedUsers();
		s.append(String.format("Rank\tUsername\t\tRXP\n"));
		s.append("--------------------------------------------------\n");
		int count = 1;
		for (User u: myUsers){
			s.append(String.format(" %d \t\t%10s\t\t%d\n", count, u.getuserName(), u.getrxp()));
			count++;
		}
		System.out.print(s.toString());
		return s.toString();
	}
}
