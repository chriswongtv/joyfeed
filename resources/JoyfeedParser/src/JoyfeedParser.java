import java.util.Scanner;

public class JoyfeedParser {
	JoyfeedParser() {
		
	}
	
	void parse() {
		Scanner reader = new Scanner(System.in);
		System.out.println("Paste: ");
		String output = new String();
		
		for (int i = 0; i < 7; i++) {
	        String in = reader.nextLine();
	        String score_old = in.substring(in.indexOf(":") + 2);
	        String score_new = new String();
	        double score = 0;
	        if (score_old.indexOf(",") != -1) {
	        	score_new = score_old.substring(0, score_old.indexOf(","));
	        }
	        
	        score = Double.parseDouble(score_new);
	        
	        String rank = new String();
	        if (score < 0.01) {
	        	rank = "EXTREMELY_LOW";
	        } else if (score < 0.05) {
	        	rank = "VERY_LOW";
	        } else if (score < 0.1) {
	        	rank = "LOW";
	        } else if (score < 0.4) {
	        	rank = "MEDIUM";
	        } else if (score < 0.6) {
	        	rank = "HIGH";
	        } else if (score < 0.8) {
	        	rank = "VERY_HIGH";
	        } else {
	        	rank = "EXTREMELY_HIGH";
	        }
	        
	        System.out.println();
	        
	        if (i == 6) {
	        	output = output + rank;
	        } else
	        	output = output + rank + ",";
	    }
		
		System.out.println(output);
	}

	public static void main(String[] args) {
		JoyfeedParser parser = new JoyfeedParser();
		Boolean flag = true;
		while (flag == true) {
			parser.parse();
		}
	}

}
