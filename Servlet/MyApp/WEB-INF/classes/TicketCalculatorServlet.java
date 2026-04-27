import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/calculate")
public class TicketCalculatorServlet extends HttpServlet {

    private static final Map<String, Integer> MOVIE_PRICES = new HashMap<>();

    static {
        MOVIE_PRICES.put("Stellar Drift",       380);
        MOVIE_PRICES.put("The Last Algorithm",  320);
        MOVIE_PRICES.put("Neon Dynasty",        360);
        MOVIE_PRICES.put("Whispers in Rain",    260);
        MOVIE_PRICES.put("Abyss Protocol",      300);
        MOVIE_PRICES.put("Crimson Meridian",    280);
        MOVIE_PRICES.put("Quantum Hearts",      340);
        MOVIE_PRICES.put("Desert Kings",        290);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        PrintWriter out = res.getWriter();

        try {
            String movieName  = req.getParameter("movie");
            String seatType   = req.getParameter("seatType");
            int    numTickets = Integer.parseInt(req.getParameter("tickets"));

            if (numTickets < 1 || numTickets > 10) {
                res.setStatus(400);
                out.print("{\"error\": \"Tickets must be between 1 and 10\"}");
                return;
            }

            int basePrice = MOVIE_PRICES.getOrDefault(movieName, 300);
            int unitPrice = "premium".equalsIgnoreCase(seatType)
                    ? (int) Math.round(basePrice * 1.5)
                    : basePrice;

            int subtotal    = unitPrice * numTickets;
            int convenience = (int) Math.round(subtotal * 0.05);
            int gst         = (int) Math.round((subtotal + convenience) * 0.18);
            int grandTotal  = subtotal + convenience + gst;

            out.print("{");
            out.print("\"movie\":"       + "\"" + movieName  + "\",");
            out.print("\"seatType\":"    + "\"" + seatType   + "\",");
            out.print("\"tickets\":"     + numTickets         + ",");
            out.print("\"unitPrice\":"   + unitPrice          + ",");
            out.print("\"subtotal\":"    + subtotal           + ",");
            out.print("\"convenience\":" + convenience        + ",");
            out.print("\"gst\":"         + gst                + ",");
            out.print("\"grandTotal\":"  + grandTotal);
            out.print("}");

        } catch (NumberFormatException e) {
            res.setStatus(400);
            out.print("{\"error\": \"Invalid ticket count\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse res)
            throws IOException {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setStatus(200);
    }
}