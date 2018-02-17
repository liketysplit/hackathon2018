package application;

public class User implements Comparable<User>{
	private String Fname;
	private String Lname;
	private String userName;
	private String email;
	private String password;
	private int rxp;
	private int level;

	public User(String userName){
		this.userName = userName;
	}
	public User(String userName, String password){
		this.userName = userName;
		this.password = password;
		this.rxp = 0;
		this.level = 1;
	}
	public User(String Fname, String Lname, String userName, String email, String password){
		this.Fname = Fname;
		this.Lname = Lname;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.rxp = 0;
		this.level = 1;
	}

	public int compareTo(User u){
		return this.getrxp() - u.getrxp();
	}

	@Override
	public boolean equals(Object o){
		User other = (User)o;
		return this.getuserName().equals(other.getuserName());
	}

	public String getFname(){
		return Fname;
	}
	public String getLname(){
		return Lname;
	}
	public String getuserName(){
		return userName;
	}
	public int getrxp(){
		return rxp;
	}
	public void setrxp(int i){
		this.rxp = i;
	}
	public int getlevel(){
		return level;
	}

	public void addRecycle(int points){
		rxp += points;
		level = rxp/100 + 1;
	}

	public boolean checkPass(String p){
		return this.password.equals(p);
	}
}
