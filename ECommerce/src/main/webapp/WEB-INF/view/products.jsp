<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="head.jsp"></jsp:include>

  <main role="main" class="inner cover">
    <h1>Products</h1>

    <div class="card-group btn-secondary">
      <c:forEach var="product" items="${inventory}">
        <div class="card">
          <img class="card-img-top" src="/images/${product.get('img')}" alt="img">
          <div class="card-body">
            <h5 class="card-title"><b>Title:</b> ${product.get("title")}</h5>
            <p class="card-text">${product.get("details")}</p>
            <p class="card-text"><b>Price:</b> ${product.get("price")}</p>
          </div>
        </div>
      </c:forEach>
    </div>
  </main>

<jsp:include page="foot.jsp"></jsp:include>
